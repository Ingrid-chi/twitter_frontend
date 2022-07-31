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
        <input type="password" placeholder="請輸入密碼" v-model="password" />
      </div>

      <div class="btn-group">
        <!-- 登入 btn -->
        <button class="btn-group__admin-signin" @click="handleLogin">
          登入
        </button>

        <!-- 前台登入 -->
        <button class="btn-group__front-signin">前台登入</button>
      </div>
    </div>
  </div>
</template>

<script>
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        if (this.account === "" || this.password === "") {
          Toast.fire({
            icon: "error",
            title: "請輸入帳號密碼",
          });
        }
        const response = await adminAPI.admin.signIn({
          account: this.account,
          password: this.password,
        });
        const { data } = response;

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        localStorage.setItem("admin-token", data.data.token);
        this.$router.push({ name: "admin-tweets" });
      } catch (error) {
        const { response } = error;
        Toast.fire({
          icon: "error",
          title: response.data.message,
        });
      }
    },
  },
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
    border-radius: 2px;
    border-bottom: 2px solid $primary-gray;
    margin-bottom: 32px;
    padding: 2px 10px;
    // color: #b5b5be;

    &__title {
      line-height: 22px;
      @extend %secondary-p;
      color: #696974;
    }
  }

  .btn-group {
    display: block;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    &__admin-signin {
      width: 356px;
      height: 46px;
      border-radius: 50px;
      background-color: $main-orange;
      color: $white;
      font-size: 20px;
      margin: 8px 0 30px 0;
    }
    &__front-signin {
      @extend %primary-p;
      color: $primary-blue;
      border-bottom: 1px solid $primary-blue;
      padding: 0;
    }
  }
}
</style>
