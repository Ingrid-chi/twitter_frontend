 <template>
  <div class="content__wrapper__tweet">
    <div class="content__tweet">
      <img
        class="content__tweet__img"
        src="https://randomuser.me/api/portraits/lego/2.jpg"
        alt="userImg"
      />
      <div class="content__tweet__name">Apple</div>
      <div class="content__tweet__account">@Apple</div>
      <div class="content__tweet__text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas semper
        ex eget iaculis luctus.Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Maecenas semper ex eget iaculis luctus. Vivamus augue
        sapien, lacinia a vulputate et, sollicitudin non odio. Integer elementum
        porttitor ante, non dignissim justo luctus in. Nullam at blandit massa.
        Nullam vitae porta metus.
      </div>
      <div class="content__tweet__time">上午 10:05・2021年11月10日</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TweetReply",
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
      
;
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

 