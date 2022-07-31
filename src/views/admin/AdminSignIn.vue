<template>
  <div class="adminSignIn-wrapper">
    <div class="adminSignIn-container">
      <div class="adminSignIn-container__img">
        <img src="./../../assets/logo.png" width="40px" height="40px" alt="" />
      </div>

      <h3 class="adminSignIn-container__title">後台登入</h3>

      <!-- 帳號 -->
      <div class="adminSignIn-container__input-account">
        <p class="adminSignIn-container__input-account__title">帳號</p>
        <input v-model="account" type="text" placeholder="請輸入帳號" />
      </div>

      <!-- 密碼 -->
      <div class="adminSignIn-container__input-password">
        <p class="adminSignIn-container__input-password__title">密碼</p>
        <input type="text" placeholder="請輸入密碼" />
      </div>

      <!-- 登入 btn -->
      <button>登入</button>

      <!-- 前台登入 -->
      <button>前台登入</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.adminSignIn-wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
  width: max-content;
}
.adminSignIn-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 69px;

  &__img {
    width: 40px;
    height: 40px;
  }
  &__title {
    color: #1c1c1c;
    padding: 29px 0 40px 0;
  }

  input {
    background: none;
    outline: none;
    border: none;
    line-height: 26px;
    @extend %primary-p;
  }
  &__input-account,
  &__input-password {
    width: 356px;
    height: 54px;
    background-color: #f5f8fa;
    border-bottom: 2px solid $primary-gray;
    margin-bottom: 32px;
    padding: 2px 10px;
    color: #B5B5BE;

    &__title {
      line-height: 22px;
      @extend %secondary-p;
      color: #696974;
    }
  }
}
</style>
