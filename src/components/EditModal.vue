<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <img :src="deleteOrange" :alt="deleteOrange.title" @click="hideModal" />
        <div class="title">編輯個人資料</div>
        <button class="save-btn">儲存</button>
      </div>
      <div class="modal-main">
        <img src="https://i.imgur.com/hCJiDle.png" alt="" class="cover" />
        <img :src="camera" alt="" class="camera" />
        <img :src="deleteWhite" alt="" class="delete-white" />
        <img :src="plus" alt="" class="plus" />
        <div class="avator-wrapper">
          <img
            class="avator"
            src="https://randomuser.me/api/portraits/lego/2.jpg"
            alt="userImg"
          />
          <img :src="camera" alt="" class="avator-camera" />
          <img :src="plus" alt="" class="avator-plus" />
        </div>
        <div class="modal-main-form">
          <div class="modal-main-name">
            <label for="name">名稱</label>
            <input
              id="name"
              v-model="name"
              name="name"
              type="text"
              placeholder=""
            />
          </div>
          <p class="counter">/50</p>

          <div class="modal-main-description">
            <label for="">自我介紹</label
            ><textarea
              class=""
              name=""
              id=""
              cols="30"
              rows="3"
              wrap="hard"
              maxlength="140"
              placeholder=""
              v-model="userDescription"
            ></textarea>
          </div>

          <p class="counter">0/160</p>
        </div>
      </div>
      <div class="modal-warn" v-show="warn">{{ warnText }}</div>
    </div>
  </div>
</template>
<script>
import { commonItems } from "../configs/commonConfigs";
import { mapMutations } from "vuex";
import tweetApis from "../apis/tweet";
// import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "EditModal",
  data() {
    return {
      delete: commonItems.deleteOrange,
      name: "",
      userDescription: "",
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
    deleteWhite() {
      return require(`../assets/${commonItems.deleteWhite.image}`);
    },
    camera() {
      return require(`../assets/${commonItems.camera.image}`);
    },
    plus() {
      return require(`../assets/${commonItems.plus.image}`);
    },
    // warnText() {
    //   return !this.userDescription.length
    //     ? "內容不可空白"
    //     : "字數不可超過160字";
    // },
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
      await tweetApis.createTweet(this.tweetText);

      // 重新拉貼文內容並放到state
      const { data } = await tweetApis.getTweets();
      this.setTweets(data);

      this.warn = false;
      this.tweetText = "";
      this.$emit("submit");
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
  height: 639px;
  min-height: 610px;
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  position: fixed;
  top: 10vh;
  left: 21vw;
}
.modal-header {
  height: 56px;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  border-bottom: 1px solid $line-gray;
  img {
    @include size(15px, 15px);
    margin-left: 19.5px;
    // position: absolute;
    // top: 20.5px;
    // left: 19.5px;
  }
  .title {
    @include font(26px, 700, 18px);
    margin-left: 36.5px;
  }
  .save-btn {
    @extend %modal-btn;
    position: absolute;
    top: 8px;
    right: 16px;
  }
}
// .modal-warn {
//   @include font(15px, 500, 15px);
//   position: absolute;
//   bottom: 28px;
//   right: 101px;
//   color: #fc5a5a;
// }

// .modal-btn {
//   @extend %modal-btn;
//   position: absolute;
//   bottom: 16px;
//   right: 16px;
// }
.modal-main {
  @include size(100%, 243px);
  position: relative;

  .avator {
    position: relative;
    border: 4px solid white;
    border-radius: 50%;
    background-clip: content-box;
    object-fit: cover;
    opacity: 50%;
    &-wrapper {
      position: absolute;
      top: 124px;
      left: 16.13px;
      border-radius: 50%;
      background-color: #171725;

      @include size(141.1px, 140px);
    }
    &-camera {
      position: absolute;
      top: 60px;
      left: 59.87px;
      @include size(20px, 20px);
    }
    &-plus {
      position: absolute;
      top: 66.17px;
      left: 65.01px;
      @include size(9.72px, 9.72px);
    }
  }
  .cover {
    @include size(100%, 200px);
    object-fit: cover;
    opacity: 75%;
  }
  .camera {
    position: absolute;
    top: 90px;
    left: 279px;
    @include size(20px, 20px);
  }
  .delete-white {
    position: absolute;
    top: 92.5px;
    right: 286.5px;
    @include size(15px, 15px);
  }
  .plus {
    position: absolute;
    top: 96.17px;
    left: 284.14px;
    @include size(9.72px, 9.72px);
  }
  &-form {
    padding: 80px 16px 8px 16px;
  }
  &-name {
    height: 54px;
    background-color: #f5f8fa;
    border-radius: 2px;
    border-bottom: 2px solid $primary-gray;
    padding: 2px 10.55px;

    label {
      @extend %secondary-p;
      height: 22px;
      display: block;
      text-align: left;
      line-height: 22px;
      font-weight: 400;
      color: #696974;
    }

    input {
      @extend %primary-p;
      height: 26px;
      width: 100%;
      display: block;
      border: none;
      background-color: #f5f8fa;
      line-height: 26px;
      font-weight: 400;
      color: #b5b5be;
    }
  }
  &-description {
    border-bottom: 2px solid $primary-gray;
    border-radius: 2px;
    padding: 2px 10.55px;
    background-color: #f5f8fa;

    @include font(26px, 700, 18px);
    color: $secondary-gray;
    label {
      @extend %secondary-p;
      height: 22px;
      display: block;
      text-align: left;
      line-height: 22px;
      font-weight: 400;
      color: #696974;
    }
    textarea {
      width: 100%;
      min-height: 147px;
      border: none;
      resize: none;
      outline: none;
      display: inline-block;
      background-color: #f5f8fa;
    }
  }
  .counter {
    margin-top: 4px;
    margin-bottom: 8px;
    text-align: end;
    @include font(20px, 500, 12px);
    color: #696974;
  }
}
</style>