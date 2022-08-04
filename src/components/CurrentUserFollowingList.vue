<template>
  <div class="followingList-wrapper">
    <div class="followingList-content">
      <div class="followingList-content__avatar">
        <img src="./../assets/logo-gray.png" alt="" />
      </div>

      <div class="followingList-content__detail">
        <p class="followingList-content__detail__name primary-bold">APPLE</p>
        <p class="followingList-content__detail__description">
          Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco
          cillum dolor. Voluptate exercitation incididunt aliquip deserunt
          reprehenderit elit laborum.
        </p>
      </div>

      <button class="followingList-content__btn-checked">
        正在跟隨
      </button>

      <!-- <button class="followingList-content__btn-default">跟隨</button> -->
    </div>

    <div class="line-bottom"></div>
  </div>
</template>

<script>
export default {
  name: "CurrentUserFollowingList",
};
</script>

<style lang="scss" scoped>
// 追隨者 & 正在追隨 內容
.followingList-content {
  padding: 16px 30px 16px 23px;
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr;

  &__avatar {
    width: 50px;
    height: 50px;
  }

  &__detail {
    padding: 0 0 15px 8px;

    &__name,
    &__description {
      padding-top: 8px;
      @extend %primary-p;
      color: $main-black;
      line-height: 26px;
    }
  }

  &__btn-checked {
    position: absolute;
    top: 16px;
    right: 30px;
    @extend %btn-checked;
  }
  &__btn-default {
    position: absolute;
    top: 16px;
    right: 30px;
    @extend %btn-default;
  }
}

// 底線
.line-bottom {
  @extend %line-bottom;
}
</style>
