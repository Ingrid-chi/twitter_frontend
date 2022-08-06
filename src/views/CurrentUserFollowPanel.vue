<template>
  <div class="followPanel-wrapper">
    <div class="followPanel">
      <!-- 大左 -->
      <NavBar />

      <!-- 大中 -->
      <div class="followPanel__container">
        <!-- 中左 -->
        <div class="followPanel__container__line-left"></div>

        <!-- 中中 中間內容 -->
        <div class="followPanel__container__content">
          <!-- 上方回上一頁 icon們 (拆成小區塊 BEM) -->
          <div class="followPanel-title">
            <button
              @click.stop.prevent="goBack"
              class="followPanel-title__icon"
            >
              <img src="./../assets/back.png" alt="" />
            </button>

            <div class="followPanel-title__detail">
              <h5 class="followPanel-title__detail__name">{{ user.name }}</h5>
              <div
                class="followPanel-title__detail__tweetsTotal secondary-bold"
              >
                {{ user.TweetsCount + "推文" }}
              </div>
            </div>
          </div>

          <div class="line-bottom"></div>

          <!-- 追隨者 & 正在追隨 頁籤 -->
          <div class="followPanel-tag">
            <router-link
              v-for="item in items"
              :key="item.id"
              :to="`/heyjohn/${item.path}`"
            >
              <button
                :class="[
                  'followPanel-tag__btn primary-bold',
                  { checked: currentPage.includes(item.path) },
                ]"
              >
                {{ item.title }}
              </button>
            </router-link>
          </div>

          <div class="line-bottom"></div>

          <!-- 追隨者 & 正在追隨 內容 -->
          <CurrentUserFollowerList
            :userId="user.id"
            v-if="currentPage.includes('followers')"
          />
          <CurrentUserFollowingList :userId="user.id" v-else />

          <!-- 中右 -->
          <div class="followPanel__container__line-right"></div>
        </div>

        <!-- 大右 -->
        <PopularUser />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
import CurrentUserFollowerList from "./../components/CurrentUserFollowerList";
import CurrentUserFollowingList from "./../components/CurrentUserFollowingList";
import { currentUserFollowPanelItems } from "../configs/contentConfigs";
import { mapState } from "vuex";

export default {
  name: "CurrentUserFollowPanel",

  components: {
    NavBar,
    PopularUser,
    CurrentUserFollowerList,
    CurrentUserFollowingList,
  },

  data() {
    return {
      items: currentUserFollowPanelItems,
      currentPage: "",
      user: {},
    };
  },

  created() {
    this.currentPage = this.$route.path;
    this.user = this.currentUser;
    console.log(this.user);
  },

  methods: {
    goBack() {
      this.$router.back();
    },
  },

  computed: {
    ...mapState(["currentUser"]),
  },

  watch: {
    "$route.path": function (newValue) {
      this.currentPage = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.followPanel-wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}

.followPanel {
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    &__content {
      margin: 0 24px 0 20px;
      border-left: 1px solid $line-gray;
      border-right: 1px solid$line-gray;
    }
  }
}

// 中間內容
// 上方回上一頁 icon們
.followPanel-title {
  display: flex;
  align-items: center;
  padding: 16px 0 17px 28px;

  &__detail {
    padding-left: 19px;
    &__name {
      color: $main-black;
    }
    &__tweetsTotal {
      font-size: 13px;
      color: $secondary-gray;
    }
  }
}

// 追隨者 & 正在追隨 頁籤
.followPanel-tag {
  &__btn {
    @extend %tag-btn;
  }
}

// 底線
.line-bottom {
  @extend %line-bottom;
}
</style>
