<template>
  <div class="content__wrapper__reply-list">
    <div class="content__wrapper__img">
      <img
        class="content__img"
        src="https://randomuser.me/api/portraits/lego/2.jpg"
        alt=""
      />
    </div>
    <div class="content__wrapper__other-info">
      <div class="content__other-name">Devon Lane</div>
      <div class="content__other-account">@devon_lane</div>
      <div class="dot">‧</div>
      <div class="content__other-time">3小時</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TweetReplyList",
};
</script>

<style lang="scss" scoped>
.content {
  &__wrapper {
    &__reply-list {
      width: 100%;
      height: 148px;
      display: flex;
      flex-flow: row nowrap;
      border-top: 1px solid $line-gray;
      border-bottom: 1px solid $line-gray;
      padding: 16px 30px 16px 23px;
    }
    &__img {
      width: 50px;
      height: 100%;
      margin-right: 8px;
    }
    &__other-info {
      width: 100%;
      display: flex;
      flex-flow: row nowrap;
    }
  }
  &__img {
    width: 50px;
    height: 50px;
  }
  &__other-name {
    line-height: 26px;
  }
  &__other-account {
    line-height: 22px;
  }
  &__other-time {
    line-height: 22px;
  }
}
</style>
