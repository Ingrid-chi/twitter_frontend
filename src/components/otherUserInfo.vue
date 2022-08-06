<template>
  <div class="currentUserInfo-wrapper">
    <!-- 上方回上一頁 icon們 -->
    <div class="currentUserInfo-title">
      <button class="currentUserInfo-title__icon">
        <img src="./../assets/back.png" alt="" />
      </button>

      <div class="currentUserInfo-title__detail">
        <h5 class="currentUserInfo-title__detail__name">{{ user.name }}</h5>
        <div class="currentUserInfo-title__detail__tweetsTotal secondary-bold">
          {{ user.TweetsCount }} 推文
        </div>
      </div>
    </div>

    <!-- 個人資料內容 -->
    <div class="currentUserInfo-detail">
      <div class="currentUserInfo-detail__background">
        <img
          class="currentUserInfo-detail__background__img"
          :src="user.cover"
          alt=""
        />
      </div>

      <div class="currentUserInfo-detail__avatar">
        <img
          class="currentUserInfo-detail__avatar__img"
          :src="user.avatar"
          alt=""
        />
      </div>

      <div class="currentUserInfo-detail__nameDetail">
        <h5 class="currentUserInfo-detail__nameDetail__name">
          {{ user.name }}
        </h5>
        <p class="currentUserInfo-detail__nameDetail__account">
          {{ "@" + user.account }}
        </p>
        <p class="currentUserInfo-detail__nameDetail__description">
          {{ user.introduction }}
        </p>
      </div>

      <button class="currentUserInfo-detail__edit">編輯個人資料</button>
    </div>

    <!-- 跟隨中 & 跟隨者 可連結的地方-->
    <div
      :followItems="currentUserFollowPanelItems"
      class="currentUserInfo-followTotal"
    >
      <div class="currentUserInfo-followTotal__following">
        <router-link to="/heyjohn/followings">
          <label class="currentUserInfo-followTotal__following__count">{{
            user.FollowingCount + "個"
          }}</label>
          <label class="currentUserInfo-followTotal__following__text"
            >跟隨中</label
          >
        </router-link>
      </div>
      <div class="currentUserInfo-followTotal__follower">
        <router-link to="/heyjohn/followers">
          <label class="currentUserInfo-followTotal__follower__count">{{
            user.FollowerCount + "位"
          }}</label>
          <label class="currentUserInfo-followTotal__follower__text"
            >跟隨者</label
          >
        </router-link>
      </div>
    </div>
    <!-- <EditModal v-show="editShow"> </EditModal> -->
  </div>
</template>

<script>
import { currentUserFollowPanelItems } from "../configs/contentConfigs";
// import EditModal from "./EditModal";

export default {
  name: "OtherUserInfo",
  components: {
    // EditModal,
  },

  props: {
    user: {
      type: Object,
      require: true,
    },
  },

  data() {
    return {
      currentUserFollowPanelItems: currentUserFollowPanelItems,
      editShow: true,
    };
  },

  methods: {
    getFollowPanelItemId(itemId) {
      this.itemId = itemId;
    },
  },
};
</script>

<style lang="scss" scoped>
// 上方回上一頁 icon們
.currentUserInfo-title {
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

// 個人資料內容
.currentUserInfo-detail {
  position: relative;
  &__background {
    position: absolute;
    z-index: -1;
    max-width: 100%;
    max-height: 200px;
    // 超出範圍不顯示
    overflow: hidden;
    &__img {
      // 自動等比縮放
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }

  &__avatar {
    padding: 124px 0 0px 16.13px;
    &__img {
      width: 141.1px;
      height: 140px;
      border-radius: 50%;
      border: 4px solid $white;
    }
  }

  &__nameDetail {
    padding: 8px 16px;
    &__name {
      color: $main-black;
    }
    &__account {
      @extend %secondary-p;
      color: $secondary-gray;
    }
    &__description {
      @extend %secondary-p;
      color: $main-black;
      padding: 6px 0 0 0.13px;
    }
  }

  // 編輯個人資料
  &__edit {
    position: absolute;
    top: 216px;
    right: 16px;
    @extend %btn-default;
  }
}

// 跟隨中 & 跟隨者
.currentUserInfo-followTotal {
  display: flex;
  padding: 0 0 16px 16.13px;

  &__following {
    padding-right: 20px;
  }

  &__following,
  &__follower {
    @extend %secondary-p;
    &__count {
      color: $main-black;
    }
    &__text {
      color: $secondary-gray;
    }
  }
}
</style>
