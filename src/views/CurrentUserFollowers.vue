<template>
  <div class="currentUserFollowers-wrapper">
    <div class="currentUserFollowers">
      <!-- 大左 -->
      <NavBar />

      <!-- 大中 -->
      <div class="currentUserFollowers__container">
        <!-- 中左 -->
        <div class="currentUserFollowers__container__line-left"></div>

        <!-- 中中 中間內容 -->
        <div class="currentUserFollowers__container__content">
          <!-- 上方回上一頁 icon們 (拆成小區塊 BEM) -->
          <div class="currentUserFollowers-title">
            <div class="currentUserFollowers-title__icon">
              <img src="./../assets/back.png" alt="" />
            </div>

            <div class="currentUserFollowers-title__detail">
              <h5 class="currentUserFollowers-title__detail__name">John Doe</h5>
              <div
                class="currentUserFollowers-title__detail__tweetsTotal secondary-bold"
              >
                25 推文
              </div>
            </div>
          </div>

          <div class="line-bottom"></div>

          <!-- 追隨者 & 正在追隨 頁籤 -->
          <div class="currentUserFollowers-tag">
            <button class="currentUserFollowers-tag__btn primary-bold">
              追隨者
            </button>
            <button class="currentUserFollowers-tag__btn primary-bold">
              正在追隨
            </button>
          </div>

          <div class="line-bottom"></div>

          <!-- 追隨者 & 正在追隨 內容 -->
          <CurrentUserFollowerList />
          <CurrentUserFollowingList />

          <!-- 中右 -->
          <div class="currentUserFollowers__container__line-right"></div>
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

export default {
  name: "CurrentUserFollowers",

  components: {
    NavBar,
    PopularUser,
    CurrentUserFollowerList,
    CurrentUserFollowingList,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.currentUserFollowers-wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}

.currentUserFollowers {
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
  }
}

// 中間內容
// 上方回上一頁 icon們
.currentUserFollowers-title {
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

// 追隨者 & 正在追隨 頁籤
.currentUserFollowers-tag {
  &__btn {
    @extend %tag-btn;
  }
}

// 底線
.line-bottom {
  @extend %line-bottom;
}
</style>
