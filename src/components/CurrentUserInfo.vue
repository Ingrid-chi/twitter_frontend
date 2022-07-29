<template>
  <div class="wrapper">

    <!-- 上方回上一頁 icon們 -->
    <div class="CurrentUserInfo-title">
      <div class="CurrentUserInfo-title__icon">
        <div class="img"></div>
      </div>

      <div class="CurrentUserInfo-title__detail">
        <h5 class="CurrentUserInfo-title__detail__name">John Doe</h5>
        <div class="CurrentUserInfo-title__detail__tweetsTotal secondary-bold">25 推文</div>
      </div>
    </div>

    <!-- 個人資料內容 -->
    <div class="CurrentUserInfo-detail">
      <div class="CurrentUserInfo-detail__background"></div>
      <div class="CurrentUserInfo-detail__avatar"></div>
      <div class="CurrentUserInfo-detail__nameDetail">
        <h5 class="CurrentUserInfo-detail__nameDetail__name">John Doe</h5>
        <p class="CurrentUserInfo-detail__nameDetail__account">@heyjohn</p>
        <p class="CurrentUserInfo-detail__nameDetail__description">Amet mini  molit non deserunt ullamco est sit aliqua dolor do amet sint.</p>
      </div>
      <button class="CurrentUserInfo-detail__edit">編輯個人資料</button>
    </div>

    <!-- 跟隨中 & 跟隨者 可連結的地方-->
    <div class="CurrentUserInfo-followTotal">
      <div class="CurrentUserInfo-followTotal__following">
        <a href="#">
          <label for="">34個</label>
          <label for="">跟隨中</label>
        </a>
      </div>
      <div class="CurrentUserInfo-followTotal__follower">
        <a href="#">
          <label for="">59位</label>
          <label for="">跟隨者</label>
        </a>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "CurrentUserInfo",

  components: {
  },

};
</script>

<style lang="scss" scoped>

// 上方回上一頁 icon們 
.CurrentUserInfo-title {
  display: flex;
  align-items: center;
  &__icon {
    width: 17px;
    height: 14px;
    border: 1px solid #000;
  }

  &__detail {
    &__name {
    }
    &__tweetsTotal {
      font-size: 13px;
    }
  }
}

// 個人資料內容
.CurrentUserInfo-detail {
  &__background {
    max-width: 639px;
    max-height: 200px;

  }
  &__avatar {

  }
  &__nameDetail {

  }

}

</style>