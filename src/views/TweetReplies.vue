<template>
  <div class="wrapper">
    <div class="tweet-replies">
      <NavBar />
      <div class="tweet-replies__container">
        <div class="tweet-replies__container__line-left"></div>
        <div class="tweet-replies__container__content">
          <div class="content__wrapper__title">
            <img class="content__icon-back" :src="backIcon" :alt="back.title" />
            <h4 class="content__title">推文</h4>
          </div>
          <TweetReply />
          <div class="content__wrapper__reply-like-info">
            <!-- <div class="content__reply-like-text"> -->
            <div class="content__reply-nums">34</div>
            <div class="content__reply-text">回覆</div>
            <!-- </div> -->
            <!-- <div class="content__reply-like-icons"> -->
            <div class="content__like-nums">808</div>
            <div class="content__like-text">喜歡次數</div>
            <!-- </div> -->
          </div>
          <div class="content__wrapper__reply-like-icons">
            <img
              class="content__reply-icon"
              :src="replyIcon"
              :alt="reply.title"
            />
            <img class="content__like-icon" :src="likeIcon" :alt="like.title" />
          </div>
          
          <TweetReplyList />   
        </div>
        <div class="tweet-replies__container__line-right"></div>
           
      </div>
      <PopularUser />
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
import TweetReply from "./../components/TweetReply";
import TweetReplyList from "./../components/TweetReplyList";
import { commonItems } from "../configs/commonConfigs";

export default {
  data() {
    return {
      back: commonItems.back,
      reply: commonItems.reply,
      like: commonItems.like,
    };
  },
  components: {
    NavBar,
    PopularUser,
    TweetReply,
    TweetReplyList,
  },
  computed: {
    backIcon() {
      return require(`../assets/${this.back.image}`);
    },
    replyIcon() {
      return require(`../assets/${this.reply.image}`);
    },
    likeIcon() {
      return require(`../assets/${this.like.image}`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap");

.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}
.tweet-replies {
  height: 100vh;
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    padding: 0px 24px 0 20px;

    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }
  }
  .content {
    &__wrapper {
      &__title {
        height: 72px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $line-gray;
        padding-left: 28px;
      }
      &__tweet {
        margin: 16px 21px 8px 16px;
        border-bottom: 1px solid $line-gray;
      }
      &__reply-like-info {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 16px 16.13px;
        border-bottom: 1px solid $line-gray;
      }
      &__reply-like-icons {
        height: 68px;
        display: flex;
        align-items: center;
        padding-left: 19.49px;
      }
    }
    &__title {
      line-height: 72px;
    }
    &__icon-back {
      width: 17px;
      height: 14px;
      display: inline-block;
      margin-right: 19px;
    }
    &__tweet {
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 25px 25px 1fr 22px;
      grid-gap: 0 8px;
      grid-template-areas:
        "img name "
        "img account "
        "text text "
        "time time ";
      &__img {
        height: 50px;
        width: 50px;
        margin-bottom: 8px;
        object-fit: cover;
      }
      &__name {
        grid-area: name;
        line-height: 26px;
        font-weight: 700;
      }
      &__account {
        grid-area: account;
        margin-bottom: 8px;
        line-height: 22px;
        font-size: 14px;
        color: $secondary-gray;
      }
      &__text {
        grid-area: text;
        margin-bottom: 8px;
        font-size: 24px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &__time {
        @extend %secondary-p;
        grid-area: time;
        margin-bottom: 8px;
        line-height: 22px;
        font-weight: 500;
        color: $secondary-gray;
      }
    }
    &__reply-nums {
      margin-right: 4px;
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 19px;
    }
    &__reply-text {
      margin-right: 24px;
      font-weight: 500;
      font-size: 19px;
      color: $secondary-gray;
    }
    &__reply-icon {
      height: 24.69px;
      width: 24.69px;
      margin-right: 133.13px;
    }
    &__like-nums {
      margin-right: 4px;
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 19px;
    }
    &__like-text {
      font-weight: 500;
      font-size: 19px;
      color: $secondary-gray;
    }
    &__like-icon {
      height: 23.64px;
      width: 25.12px;
    }
  }
}
</style>
