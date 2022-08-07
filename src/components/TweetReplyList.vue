<template>
  <div class="content__wrapper__reply-list">
    <router-link :to="`/${reply.UserId}`">
      <div class="content__wrapper__img">
        <img class="content__img" :src="reply.User.avatar" alt="" />
      </div>
    </router-link>

    <div class="content__wrapper__other-info">
      <div class="content__other-name">{{ reply.User.name }}</div>
      <div class="content__other-account">@{{ reply.User.account }}</div>
      <div class="content__other-dot">‧</div>
      <div class="content__other-time">{{ reply.createdAt | fromNow }}</div>
    </div>
    <div class="content__wrapper__user-account">
      <div class="content__user-reply">回覆</div>
      <div class="content__user-account">@{{ tweet.User.account }}</div>
    </div>
    <div class="content__wrapper__user-text">
      {{ reply.comment }}
    </div>
  </div>
</template>
<script>
import { fromNowFilter } from "./../utils/mixins";

export default {
  name: "TweetReplyList",
  mixins: [fromNowFilter],
  props: {
    reply: {
      type: Object,
      default: () => {},
    },
    tweet: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  &__wrapper {
    &__reply-list {
      width: 100%;
      height: 148px;
      display: grid;
      grid-template-columns: 50px 1fr;
      grid-template-rows: 26px 22px 1fr;
      grid-gap: 0 8px;
      grid-template-areas:
        "img other "
        "img user "
        "img text ";
      // border-top: 1px solid $line-gray;
      border-bottom: 1px solid $line-gray;
      padding: 16px 30px 16px 23px;
    }
    &__img {
      grid-area: img;
      width: 50px;
      height: 100%;
    }
    &__other-info {
      grid-area: other;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 8px;
    }
    &__user-account {
      grid-area: user;
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      margin-bottom: 8px;
    }
    &__user-text {
      grid-area: text;
      width: 100%;
      @include font(26px, 400, 16px);
    }
  }
  &__img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
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
</style>
