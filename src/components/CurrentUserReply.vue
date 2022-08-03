<template>
  <div class="currentUserReply-wrapper">
    
    <div class="reply-container">
      <div class="reply-container__avatar">
        <img src="./../assets/logo-gray.png" alt="" />
      </div>

      <div class="reply-container__detail">
        <!-- title -->
        <div class="reply-container__detail__title">
          <label class="reply-container__detail__title__name primary-bold"
            >John Doe</label
          >
          <label class="reply-container__detail__title__account"
            >@heyjohn．</label
          >
          <label class="reply-container__detail__title__created-at"
            >3小時
          </label>
        </div>

        <!-- reply-user -->
        <div class="reply-container__detail__user">
         <label class="reply-container__detail__user__title">回復</label> 
         <label class="reply-container__detail__user__account">@apple</label> 
        </div>

        <!-- description -->
        <p class="reply-container__detail__description">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. 
        </p>

      </div>
    </div>

    <div class="currentUserReply-wrapper__bottom"></div>
  </div>
</template>

<script>
export default {
  name: "CurrentUserReply",

  components: {},
};
</script>

<style lang="scss" scoped>
.currentUserReply-wrapper {
  &__bottom {
    @extend %line-bottom;
  }
}

.reply-container {
  display: flex;
  padding: 16px 24px;
  &__avatar {
    img {
      width: 50px;
      height: 50px;
    }
  }

  &__detail {
    padding-left: 8px;
    &__title {
      padding-bottom: 8px;
      &__name {
        @extend %primary-p;
        color: $main-black;
        padding-right: 8px;
      }
      &__account,
      &__created-at {
        @extend %secondary-p;
        color: $secondary-gray;
      }
    }

    &__user {
      padding: 8px 0;
      &__title {
        @extend %secondary-p;
        color: $secondary-gray;
        line-height: 22px;
        padding-right: 8px; 
      }
      &__account {
        @extend %secondary-p;
        color: $main-orange;
        line-height: 22px;
      }
    }

    &__description {
      @extend %secondary-p;
      color: $main-black;
      line-height: 26px;
      padding-bottom: 8px;
    }
  }
}
</style>