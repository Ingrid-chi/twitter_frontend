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
        <input
          :class="{ error: account.length >= 50, finished: account !== '' }"
          v-model="account"
          type="text"
          placeholder="請輸入帳號"
          @keyup.enter="handleLogin"
          @keydown="limited"
        />
        <div class="adminSignIn-container__input-account__account">
          <p
            v-show="account.length >= 50"
            style="color: red"
            class="adminSignIn-container__input-account__account__message secondary-bold"
          >
            帳號上限50字
          </p>
          <p
            class="adminSignIn-container__input-account__account__limited secondary-bold"
          >
            {{ account.length + "/50" }}
          </p>
        </div>
      </div>

      <!-- 密碼 -->
      <div class="adminSignIn-container__input-password">
        <p class="adminSignIn-container__input-password__title">密碼</p>
        <input
          type="password"
          placeholder="請輸入密碼"
          v-model="password"
          @keyup.enter="handleLogin"
        />
      </div>

      <div class="btn-group">
        <!-- 登入 btn -->
        <button class="btn-group__admin-signin" @click="handleLogin">
          登入
        </button>

        <!-- 前台登入 -->
        <router-link class="btn-group__front-signin" :to="{ name: 'sign-in' }"
          ><button class="btn-group__front-signin">
            前台登入
          </button></router-link
        >
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
        if (this.account.length > 50 || this.password.length > 50) {
          Toast.fire({
            icon: "error",
            title: "帳號密碼上限50個字",
          });
        }
        const response = await adminAPI.admin.signIn({
          account: this.account,
          password: this.password,
        });

        const { data } = response;

        if (response.status !== "success") {
          throw new Error(response.message);
        }

        localStorage.setItem("admin-token", data.token);
        this.$router.push({ name: "admin-tweets" });
      } catch (error) {
        const { response } = error;

        if (response.data.message) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },

    // 限制 input 字數不能超過 50
    // keyCode !== 8，除了鍵盤上 delete (8) 以外的，全部不能輸入
    limited(e) {
      if (this.account.length >= 50) {
        if (e.keyCode !== 8) {
          e.preventDefault();
        }
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

    width: 100%;
    padding: 2px 10px;
    border-bottom: 2px solid $primary-gray;

    &:focus {
      border-bottom: 2px solid #50b5ff;
    }
    &.error {
      border-bottom: 2px solid #fc5a5a;
    }
  }
  &__input-account,
  &__input-password {
    width: 356px;
    height: 54px;
    background-color: #f5f8fa;
    border-radius: 2px;
    margin-bottom: 32px;

    &__title {
      line-height: 22px;
      @extend %secondary-p;
      color: #696974;
      padding: 2px 0 0 10px;
    }

    &__account {
      position: relative;
      &__message {
        color: $error-red;
        @extend %min-p;
      }
      &__limited {
        position: absolute;
        top: 0;
        right: 0;
        color: #696974;
        @extend %min-p;
      }
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
