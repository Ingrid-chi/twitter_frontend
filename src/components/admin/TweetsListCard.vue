<template>
  <div class="card-wrapper">
    <img class="card-wrapper__img" :src="tweet.User.avatar" />
    <div class="card-wrapper__content">
      <div class="card-wrapper__content__header">
        <p class="card-wrapper__content__header__title">
          {{ tweet.User.name }}
        </p>
        <div class="card-wrapper__content__header__subtitle">
          <p>{{ "@" + tweet.User.account }}</p>
          <span>・</span>
          <p>{{ tweet.createdAt | fromNow }}</p>
        </div>
      </div>
      <div class="card-wrapper__content__description">
        {{ tweet.description }}
      </div>
      <div class="card-wrapper__content__cancel-btn">x</div>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../../utils/mixins";
export default {
  name: "TweetsListCard",
  props: {
    tweet: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter],
};
</script>

<style lang="scss" scoped>
.card-wrapper {
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 50px 1fr;
  column-gap: 8px;

  padding: 16px 24px;
  border-bottom: 1px solid $line-gray;
  border-right: 1px solid $line-gray;

  &__img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  &__content {
    display: flex;
    flex-direction: column;

    &__header {
      display: flex;
      align-items: center;
      padding-bottom: 8px;

      &__title {
        @extend %primary-p;
        line-height: 26px;
        font-weight: 700;
        padding-right: 8px;
      }

      &__subtitle {
        @extend %secondary-p;
        line-height: 22px;
        display: flex;
        flex-direction: row;
        color: $secondary-gray;
      }
    }

    &__description {
      @extend %primary-p;
      line-height: 26px;
      font-weight: 400;
      color: $main-black;
    }

    &__cancel-btn {
      position: absolute;
      right: 5px;
    }
  }
}
</style>
