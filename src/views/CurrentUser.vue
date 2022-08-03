<template>
  <div class="currentUser-wrapper">
    <div class="currentUser">
      <NavBar />

      <div class="currentUser__container">
        <div class="currentUser__container__line-left"></div>

        <!-- 個人資料(前台) 首頁 -->
        <div class="currentUser__container__content">
          <!-- 個人資料簡介 -->
          <currentUserInfo />

          <!-- 推文、回覆、喜歡的內容 頁籤 -->
          <div class="currentUser__container__content__items">
            <!-- <div class="currentUser__container__content__items__item"> -->
              <button
                v-for="item in currentUserContentItems"
                :key="item.id"
                class="currentUser__container__content__items__btn primary-bold"
              >
                {{ item.title }}
              </button>
            <!-- </div> -->
          </div>

          <div class="currentUser__container__content__bottom"></div>

          <!-- 推文、回覆、喜歡的內容 內容 -->
          <CurrentUserTweets />
          <CurrentUserReply />
          <CurrentUserLike />
        </div>

        <div class="currentUser__container__line-right"></div>
      </div>

      <PopularUser />
    </div>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
import CurrentUserInfo from "./../components/CurrentUserInfo";
import CurrentUserTweets from "./../components/CurrentUserTweets";
import CurrentUserReply from "./../components/CurrentUserReply";
import CurrentUserLike from "./../components/CurrentUserLike";
import { currentUserContentItems } from "../configs/contentConfigs";

export default {
  name: "CurrentUser",

  components: {
    NavBar,
    PopularUser,
    CurrentUserInfo,
    CurrentUserTweets,
    CurrentUserReply,
    CurrentUserLike,
  },

  data() {
    return {
      currentUserContentItems: currentUserContentItems,
    };
  },
};
</script>

<style lang="scss" scoped>
.currentUser-wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}

.currentUser {
  display: grid;
  grid-template-columns: 178px auto 273px;

  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    padding: 0 24px 0 20px;
    &__line-left,
    &__line-right {
      @extend %line-side;
    }

    // 推文、回覆、喜歡的內容 btn
    &__content {
      &__items {
        display: flex;
        flex-direction: row;
        &__btn {
          @extend %tag-btn;
        }
      }
      &__bottom {
        @extend %line-bottom;
      }
    }
  }
}
</style>
