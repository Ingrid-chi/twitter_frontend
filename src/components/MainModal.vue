<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <img :src="deleteOrange" :alt="deleteOrange.title" @click="hideModal" />
      </div>
      <div class="modal-main">
        <img
          class="content__tweet__img"
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          alt="userImg"
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          wrap="hard"
          maxlength="140"
          placeholder="有甚麼新鮮事?"
          @focus="showWarn"
          v-model="tweetText"
        ></textarea>
      </div>
      <div class="modal-warn" v-show="warn">{{ warnText }}</div>
      <button class="modal-btn" @click="submit">推文</button>
    </div>
  </div>
</template>
<script>
import { commonItems } from "../configs/commonConfigs";
import { mapMutations } from "vuex";
import tweetApis from "../apis/tweet";
import { Toast } from "../utils/helpers";

export default {
  name: "MainModal",
  data() {
    return {
      delete: commonItems.deleteOrange,
      warn: false,
      tweetText: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    deleteOrange() {
      return require(`../assets/${this.delete.image}`);
    },
    warnText() {
      return !this.tweetText.length ? "內容不可空白" : "字數不可超過140字";
    },
  },
  methods: {
    ...mapMutations(["createTweet", "setTweets"]),

    hideModal() {
      this.$emit("hide-modal");
      this.warn = false;
      this.tweetText = "";
    },

    async submit() {
      // 建立貼文
      try {
        await tweetApis.createTweet(this.tweetText);

        // 重新拉貼文內容並放到state
        const { data } = await tweetApis.getTweets();
        this.setTweets(data);

        this.warn = false;
        this.tweetText = "";
        this.$emit("submit");
      } catch (error) {
        Toast.fire({
          icon: "warning",
          title: `${error.response.data.message}`,
        });
      }
    },
    showWarn() {
      this.warn = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal-container {
  @include size(634px, 300px);
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  position: fixed;
  top: 10vh;
  left: 21vw;
  // transform: translate(-50%, -50%);
}
.modal-header {
  height: 56px;
  position: relative;
  display: flex;
  align-items: center;
  border-bottom: 1px solid $line-gray;
  // cursor: move;
  img {
    @include size(15px, 15px);
    position: absolute;
    top: 20.5px;
    left: 19.5px;
  }
}
.modal-warn {
  @include font(15px, 500, 15px);
  position: absolute;
  bottom: 28px;
  right: 101px;
  color: #fc5a5a;
}

.modal-btn {
  @extend %modal-btn;
  position: absolute;
  bottom: 16px;
  right: 16px;
}
.modal-main {
  @include size(100%, 243px);
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  padding: 16px 24px;
  img {
    @include size(50px, 50px);
    border-radius: 50%;
    object-fit: cover;
  }
  textarea {
    width: 100%;
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
    display: inline-block;
    @include font(26px, 700, 18px);
    color: $secondary-gray;
  }
}
</style>