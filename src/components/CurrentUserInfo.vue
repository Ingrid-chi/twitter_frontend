<template>
  <div class="wrapper">
    <!-- 上方回上一頁 icon們 -->
    <div class="CurrentUserInfo-title">
      <div class="CurrentUserInfo-title__icon">
        <img src="./../assets/back.png" alt="" />
      </div>

      <div class="CurrentUserInfo-title__detail">
        <h5 class="CurrentUserInfo-title__detail__name">John Doe</h5>
        <div class="CurrentUserInfo-title__detail__tweetsTotal secondary-bold">
          25 推文
        </div>
      </div>
    </div>

    <!-- 個人資料內容 -->
    <div class="CurrentUserInfo-detail">
      <div class="CurrentUserInfo-detail__background">
        <img
          class="CurrentUserInfo-detail__background__img"
          src="https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68"
          alt=""
        />
      </div>

      <div class="CurrentUserInfo-detail__avatar">
        <img
          class="CurrentUserInfo-detail__avatar__img"
          src="https://randomuser.me/api/portraits/lego/2.jpg"
          alt=""
        />
      </div>

      <div class="CurrentUserInfo-detail__nameDetail">
        <h5 class="CurrentUserInfo-detail__nameDetail__name">John Doe</h5>
        <p class="CurrentUserInfo-detail__nameDetail__account">@heyjohn</p>
        <p class="CurrentUserInfo-detail__nameDetail__description">
          Amet mini molit non deserunt ullamco est sit aliqua dolor do amet
          sint.
        </p>
      </div>

      <button class="CurrentUserInfo-detail__edit">編輯個人資料</button>
    </div>

    <!-- 跟隨中 & 跟隨者 可連結的地方-->
    <div class="CurrentUserInfo-followTotal">
      <div class="CurrentUserInfo-followTotal__following">
        <a href="#">
          <label class="CurrentUserInfo-followTotal__following__count">34個</label>
          <label class="CurrentUserInfo-followTotal__following__text">跟隨中</label>
        </a>
      </div>
      <div class="CurrentUserInfo-followTotal__follower">
        <a href="#">
          <label class="CurrentUserInfo-followTotal__follower__count">59位</label>
          <label class="CurrentUserInfo-followTotal__follower__text">跟隨者</label>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CurrentUserInfo",

  components: {},
};
</script>

<style lang="scss" scoped>
// 上方回上一頁 icon們
.CurrentUserInfo-title {
  display: flex;
  align-items: center;
  padding: 16px 0 17px 28px;
  &__icon {
    width: 17px;
    height: 14px;
  }
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
.CurrentUserInfo-detail {
  position: relative;
  &__background {
    position: absolute;
    z-index: -1;
    max-height: 200px;
    overflow: hidden;
    &__img {
      max-width: 639px;
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
.CurrentUserInfo-followTotal {
  display: flex;
  padding: 0 0 31px 16.13px;

  &__following {
    @extend %secondary-p;
    padding-right: 20px;
    &__count {
      color: $main-black;
    }
    &__text {
      color: $secondary-gray;
    }
  }
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
