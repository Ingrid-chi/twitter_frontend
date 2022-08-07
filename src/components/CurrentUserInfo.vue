<template>
  <div class="currentUserInfo-wrapper">
    <!-- 上方回上一頁 icon們 -->
    <div class="currentUserInfo-title">
      <button class="currentUserInfo-title__icon">
        <img src="./../assets/back.png" alt="" />
      </button>

      <div class="currentUserInfo-title__detail">
        <h5 class="currentUserInfo-title__detail__name">
          {{ user.name }}
        </h5>
        <div class="currentUserInfo-title__detail__tweetsTotal secondary-bold">
          {{ user.TweetsCount + '推文' }}
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
          {{ '@' + user.account }}
        </p>
        <p class="currentUserInfo-detail__nameDetail__description">
          {{ user.introduction }}
        </p>
      </div>
      <!-- 他人資料按鈕 -->
      <div v-if="!isSelf" class="otherUserInfo__wrapper">
        <div class="otherUserInfo__img__wrapper">
          <img
            :src="require('../assets/letter.png')"
            alt=""
            class="otherUserInfo__img--letter"
          />
        </div>
        <div class="otherUserInfo__img__wrapper">
          <img
            :src="require('../assets/bell.png')"
            alt=""
            class="otherUserInfo__img--bell"
          />
        </div>

        <div class="otherUserInfo__btn--following">正在跟隨</div>
      </div>

      <button v-else class="currentUserInfo-detail__edit" @click="showModal">
        編輯個人資料
      </button>
    </div>

    <!-- 跟隨中 & 跟隨者 可連結的地方-->
    <div
      :followItems="currentUserFollowPanelItems"
      class="currentUserInfo-followTotal"
    >
      <div class="currentUserInfo-followTotal__following">
        <router-link to="/heyjohn/followings">
          <label class="currentUserInfo-followTotal__following__count">{{
            user.FollowingCount + '個'
          }}</label>
          <label class="currentUserInfo-followTotal__following__text"
            >跟隨中</label
          >
        </router-link>
      </div>
      <div class="currentUserInfo-followTotal__follower">
        <router-link to="/heyjohn/followers">
          <label class="currentUserInfo-followTotal__follower__count">{{
            user.FollowerCount + '位'
          }}</label>
          <label class="currentUserInfo-followTotal__follower__text"
            >跟隨者</label
          >
        </router-link>
      </div>
    </div>
    <EditModal v-show="show" @hide-modal="hideModal"> </EditModal>
  </div>
</template>

<script>
import { currentUserFollowPanelItems } from '../configs/contentConfigs';
import EditModal from './EditModal';
import userApis from '../apis/users';
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'CurrentUserInfo',
  components: {
    EditModal,
  },

  data() {
    return {
      currentUserFollowPanelItems: currentUserFollowPanelItems,
      isSelf: false,
      show: false,
      user: {},
    };
  },

  async created() {
    const { currentUserData } = await userApis.getCurrentUser();
    this.setCurrentUser(currentUserData);

    const response = await userApis.getUser(this.$route.params.userId);
    // const response = await userApis.getUser(this.currentUser.id);
    const { user } = response;

    console.log('user', user);
    console.log('currentUserData', currentUserData);

    this.user = {
      ...this.currentUser,
      ...user,
    };

    if (Number(this.$route.params.userId) === Number(this.currentUser.id)) {
      this.isSelf = true;
    }
  },

  computed: {
    ...mapState(['currentUser']),
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    getFollowPanelItemId(itemId) {
      this.itemId = itemId;
    },
    showModal() {
      this.show = true;
    },

    hideModal(isEdit = false) {
      this.show = false;
      if (isEdit) {
        this.$emit('fetch-user');
      }
    },
  },
  watch: {
    '$route.params.userId': async function () {
      const response = await userApis.getUser(this.$route.params.userId);

      const { user } = response;

      this.user = user;
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

.otherUserInfo {
  &__wrapper {
    @include size(208px, 40px);
    position: absolute;
    top: 216px;
    right: 16px;
    display: flex;
  }
  &__img {
    &__wrapper {
      @include size(40px, 40px);
      margin-right: 16px;
      border: 1px solid $main-orange;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &--letter {
      @include size(20px, 18px);
    }
    &--bell {
      @include size(23.9px, 21.9px);
    }
  }
  &__btn--following {
    @include size(96px, 40px);
    @include font(24px, 400, 16px);
    border-radius: 50px;
    padding: 8px 16px;
    background-color: $main-orange;
    color: white;
  }
}
</style>