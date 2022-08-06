<template>
  <div class="currentUser-wrapper">
    <div class="currentUser">
      <NavBar />

      <div class="currentUser__container">
        <div class="currentUser__container__line-left"></div>

        <!-- 個人資料(前台) 首頁 -->
        <div class="currentUser__container__content">
          <!-- 個人資料簡介 -->
          <currentUserInfo :user="user" />

          <!-- 推文、回覆、喜歡的內容 頁籤 -->
          <div class="currentUser__container__content__items">
            <button
              v-for="item in currentUserContentItems"
              :key="item.id"
              :class="[
                'currentUser__container__content__items__btn primary-bold',
                { checked: item.id === itemId },
              ]"
              @click.stop.prevent="getItemId(item.id)"
            >
              {{ item.title }}
            </button>
          </div>

          <div class="currentUser__container__content__bottom"></div>

          <!-- 推文、回覆、喜歡的內容 內容 -->
          <CurrentUserTweets v-if="itemId === 1" />
          <CurrentUserReply v-else-if="itemId === 2" />
          <CurrentUserLike v-else />
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
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

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
      itemId: 1,
      user: {},
    };
  },

  created() {
    this.fetchUser(this.$route.params.userId);
  },

  methods: {
    getItemId(itemId) {
      this.itemId = itemId;
    },

    async fetchUser(id) {
      try {
        console.log("id", id);
        const response = await usersAPI.getUser(id);
        const { user } = response;

        console.log("user", user);
        this.user = user;
        // this.$store.commit("setCurrentUser", this.user);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得當前使用者資訊，請稍後再試。",
        });
      }
    },
  },

  computed: {
    ...mapState(["currentUser"]),
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
    margin: 0 24px 0 20px;
    border-left: 1px solid $line-gray;
    border-right: 1px solid$line-gray;

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
