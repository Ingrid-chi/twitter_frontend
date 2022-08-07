 <template>
  <div class="content__wrapper__tweet">
    <div class="content__tweet">
      <img class="content__tweet__img" :src="tweet.User.avatar" alt="userImg" />
      <div class="content__tweet__name">{{ tweet.User.name }}</div>
      <div class="content__tweet__account">@{{ tweet.User.account }}</div>
      <div class="content__tweet__text">
        {{ tweet.description }}
      </div>
      <div class="content__tweet__time">{{ tweet.createdAt }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TweetReply",
  props: {
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
    &__tweet {
      margin: 16px 21px 8px 16px;
      border-bottom: 1px solid $line-gray;
    }
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
      @include lorem(3);
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
}
</style>

 