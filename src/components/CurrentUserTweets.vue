<template>
  <div class="currentUserTweets-wrapper">
    <div class="tweets-container">
      <div class="tweets-container__avatar">
        <img src="./../assets/logo-gray.png" alt="" />
      </div>

      <div class="tweets-container__detail">
        <!-- title -->
        <div class="tweets-container__detail__title">
          <label class="tweets-container__detail__title__name primary-bold"
            >John Doe</label
          >
          <label class="tweets-container__detail__title__account"
            >@heyjohn．</label
          >
          <label class="tweets-container__detail__title__created-at"
            >3小時
          </label>
        </div>

        <!-- description -->
        <p class="tweets-container__detail__description">
          {{ tweet.description }}
        </p>

        <!-- reply & like icon -->
        <div class="tweets-container__detail__count-panel">
          <!-- reply icon -->
          <div class="tweets-container__detail__count-panel__reply">
            <div class="tweets-container__detail__count-panel__reply__icon">
              <img src="./../assets/replied.png" alt="" />
            </div>
            <div class="tweets-container__detail__count-panel__reply__count">
              {{ tweet.replyCount }}
            </div>
          </div>

          <!-- like icon -->
          <div class="tweets-container__detail__count-panel__like">
            <div class="tweets-container__detail__count-panel__like__icon">
              <img src="./../assets/like.png" alt="" />
            </div>
            <div class="tweets-container__detail__count-panel__like__count">
              {{ tweet.likeCount }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="currentUserTweets-wrapper__bottom"></div>
  </div>
</template>

<script>
export default {
  name: "CurrentUserTweets",
  components: {},
  props: {
    tweet: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.currentUserTweets-wrapper {
  &__bottom {
    @extend %line-bottom;
  }
}

.tweets-container {
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

    &__description {
      @extend %secondary-p;
      color: $main-black;
      line-height: 26px;
      padding-bottom: 8px;
    }

    // reply & like icon
    &__count-panel {
      display: flex;
      align-items: center;
      &__reply {
        display: flex;
        align-items: center;
        padding-right: 40px;
        &__icon {
          img {
            width: 13.17px;
            height: 13.17px;
          }
        }
        &__count {
          @extend %secondary-p;
          color: $secondary-gray;
          padding-left: 9px;
        }
      }

      &__like {
        display: flex;
        align-items: center;
        &__icon {
          img {
            width: 13.4px;
            height: 12.61px;
          }
        }
        &__count {
          @extend %secondary-p;
          color: $secondary-gray;
          padding-left: 9px;
        }
      }
    }
  }
}
</style>
