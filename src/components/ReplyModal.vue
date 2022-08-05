<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="modal-header">
        <img
          :src="deleteOrange"
          :alt="deleteOrange.title"
          @click="hideReplyModal"
        />
      </div>
      <div class="modal-main">
        <div class="modal-other">
          <img src="https://randomuser.me/api/portraits/lego/2.jpg" alt="" />
          <div class="line"></div>
          <div class="content__wrapper__other-info">
            <div class="content__other-name">Devon Lane</div>
            <div class="content__other-account">@devon_lane</div>
            <div class="content__other-dot">‧</div>
            <div class="content__other-time">3小時</div>
          </div>
          <div class="content__wrapper__user-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            semper
          </div>
          <div class="content__wrapper__user-account">
            <div class="content__user-reply">回覆</div>
            <div class="content__user-account">@apple</div>
          </div>
        </div>
        <div class="modal-reply">
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
      </div>
      <div class="modal-warn" v-show="warn">字數不可超過140字</div>
      <button class="modal-btn" @click="submit">推文</button>
    </div>
  </div>
</template>
<script>
import { commonItems } from "../configs/commonConfigs";
import { mapMutations } from "vuex";
// import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "ReplyModal",
  data() {
    return {
      delete: commonItems.deleteOrange,
      warn: false,
      id: -1,
      tweetText: "",
      userId: -1,
      createdAt: "2022-07-31T11:13:44.000Z",
      likeCount: 0,
      replyCount: 3,
      User: {
        name: "user1",
        account: "user1",
        avatar: "https://loremflickr.com/320/240/cat/?lock=93.54589374664013",
      },
    };
  },
  props: {
    replyShow: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    deleteOrange() {
      return require(`../assets/${this.delete.image}`);
    },
  },
  methods: {
    ...mapMutations(["createTweet"]),

    hideReplyModal() {
      this.$emit("hide-reply-modal");
      this.warn = false;
      this.tweetText = "";
    },

    submit() {
      // 1. 呼叫 API，告訴 API description
      // 2. API 回前端資訊
      // 3. 將上述資訊放到 createTweet

      // this.createTweet({
      //   id: this.id,
      //   description: this.tweetText,
      //   userId: 10,
      //   createdAt: "2022-07-31T11:13:44.000Z",
      //   likeCount: 0,
      //   replyCount: 0,
      //   User: {
      //     name: "user1",
      //     account: "user1",
      //     avatar: "https://loremflickr.com/320/240/cat/?lock=93.54589374664013",
      //   },
      // });
      this.warn = false;
      this.tweetText = "";
      this.$emit("submit-reply");
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
  // @include size(634px, 300px);
  width: 634px;
  min-height: 450px;
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
.modal-other {
  width: 100%;
  min-height: 163px;
  img {
    position: absolute;
    top: 16px;
    left: 24px;
  }
  .line {
    width: 2px;
    height: 20%;
    position: absolute;
    top: 82px;
    left: 48px;
    background-color: gray;
  }
}
.content {
  &__wrapper {
    &__other-info {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-left: 56px;
      margin-bottom: 8px;
    }
    &__user-account {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-left: 56px;
      margin-bottom: 8px;
    }
    &__user-text {
      min-height: 78px;
      margin-left: 56px;
      margin-bottom: 11px;
      @include font(26px, 400, 16px);
      // word-break: break-word;
    }
  }
  &__other-name {
    margin-right: 8px;
    line-height: 26px;
    font-weight: 700;
  }
  &__other-account {
    @include font(22px, 400, 14px);
    color: $secondary-gray;
  }
  &__other-dot {
    @include font(22px, 400, 14px);
    color: $secondary-gray;
  }
  &__other-time {
    @include font(22px, 400, 14px);
    color: $secondary-gray;
  }
  &__user-reply {
    margin-right: 4px;
    @include font(22px, 400, 14px);
    color: $secondary-gray;
  }
  &__user-account {
    @include font(22px, 400, 14px);
    color: $main-orange;
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
  // @include size(100%, 243px);
  width: 100%;
  min-height: 395px;
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  padding: 16px 24px 16px 24px;
  img {
    margin-right: 8px;
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
.modal-reply {
  display: flex;
  flex-flow: row nowrap;
}
</style>