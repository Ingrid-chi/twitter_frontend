<template>
  <div class="currentUser-wrapper">
    <div class="currentUser">
      <NavBar />

      <div class="currentUser__container">
        <div class="currentUser__container__line-left"></div>

        <div class="currentUser__container__content">
          <currentUserInfo />

          <!-- 推文、回覆、喜歡的內容 btn -->
          <div class="currentUser__container__content__items">
            <div
              class="currentUser__container__content__items__item"
              v-for="item in currentUserContentItems"
              :key="item.id"
            >
              <button
                class="currentUser__container__content__items__item__btn primary-bold"
              >
                {{ item.title }}
              </button>
            </div>
          </div>

          <div class="currentUser__container__content__bottom"></div>

          <!-- 推文、回覆、喜歡的內容 內容 -->
          <currentUserTweets />
          <!-- <currentUserReplies />
          <currentUserLikes /> -->
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
import { currentUserContentItems } from "../configs/contentConfigs";

export default {
  name: "CurrentUser",

  components: {
    NavBar,
    PopularUser,
    CurrentUserInfo,
    CurrentUserTweets,
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
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }

    // 推文、回覆、喜歡的內容 btn
    &__content {
      &__items {
        display: flex;
        flex-direction: row;
        &__item {
          width: 130px;
          height: 52px;
          display: flex;
          justify-content: center;
          &__btn {
            color: $primary-gray;
            &:hover {
              width: 100%;
              height: 52px;
              color: $main-orange;
              border-bottom: 2px solid $main-orange;
            }
          }
        }
      }

      &__bottom {
        border-bottom: 1px solid $line-gray;
      }
    }
  }
}
</style>
