<template>
  <div class="wrapper">
    <div class="signin signin__container">
      <div class="signin__container__img">
        <img :src="logoImage" :alt="logo.title" />
      </div>

      <form
        autocomplete="off"
        class="signin__form"
        @submit.prevent.stop="handleSubmit"
      >
        <div class="signin__form__wrapper__title">
          <h3 class="signin__form__title">登入Alphitter</h3>
        </div>

        <div class="signin__form__wrapper__account">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="account"
            name="account"
            type="account"
            placeholder="請輸入帳號"
            maxlength="50"
            autofocus
          />
        </div>

        <div class="signin__form__wrapper__password">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            class=""
            placeholder="請輸入密碼"
            maxlength="50"
            autofocus
          />
        </div>

        <div class="signin__form__wrapper__btn">
          <button
            class="signin__form__btn"
            :disabled="isProcessing"
            type="submit"
          >
            登入
          </button>
        </div>

        <div class="signin__form__wrapper__links">
          <p>
            <router-link class="signin__form__link__signup" to="/signup">
              註冊
            </router-link>
            <span>．</span>
            <router-link
              class="signin__form__link__admin-signin"
              to="/admin/signin"
            >
              後台登入
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";
import { commonItems } from "../configs/commonConfigs";
export default {
  data() {
    return {
      account: "",
      password: "",
      isProcessing: false,
      logo: commonItems.logo,
    };
  },
  computed: {
    logoImage() {
      return require(`../assets/${this.logo.image}`);
    },
  },
  watch: {
    account() {
      if (this.account.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.account = "";
        return;
      }
    },
    password() {
      if (this.password.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.password = "";
        return;
      }
    },
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          // alert("不要空");
          Toast.fire({
            icon: "error",
            title: "請輸入帳號密碼",
          });
          return;
        }
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          account: this.account,
          password: this.password,
        });
        console.log("response", response);

        // 將伺服器回傳的 token 保存在 localStorage 中
        localStorage.setItem("token", response.data.token);
        // 透過 setCurrentUser 把使用者資料存到 Vuex 的 state 中
        // this.$store.commit('setCurrentUser', data.user)

        // 成功登入後進行轉址
        this.$router.push("/home");
      } catch (error) {
        this.isProcessing = false;
        // this.password = "";
        //顯示錯誤提示

        Toast.fire({
          icon: "warning",
          title: `${error.response.data.message}`,
        });

        console.log("!!", error.response.data);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
%form-wrapper {
  height: 54px;
  margin-top: 40px;
  background-color: #f5f8fa;
  border-radius: 2px;
  border-bottom: 2px solid $primary-gray;
  padding: 2px 10.55px;
  label {
    @extend %secondary-p;
    height: 22px;
    display: block;
    text-align: left;
    line-height: 22px;
    font-weight: 400;
    color: #696974;
  }
  input {
    @extend %primary-p;
    height: 26px;
    width: 100%;
    display: block;
    border: none;
    background-color: #f5f8fa;
    line-height: 26px;
    font-weight: 400;
    color: #b5b5be;
  }
}
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}
.signin {
  &__container {
    width: 356px;
    position: relative;
    top: 64px;
    margin: 0 auto;
    text-align: center;
    &__img {
      width: 50px;
      height: 50px;
      margin: 0 auto;
    }
  }
  &__form {
    &__wrapper {
      &__title {
        margin-top: 24px;
      }
      &__account {
        @extend %form-wrapper;
      }
      &__password {
        margin-top: 32px;
        @extend %form-wrapper;
      }
      &__btn {
        height: 46px;
        margin-top: 40px;
        border-radius: 50px;
        background-color: $main-orange;
      }
      &__links {
        @extend %primary-p;
        margin-top: 22px;
        display: flex;
        justify-content: flex-end;
        color: $black;
      }
    }
    &__btn {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      font-weight: 400;
      font-size: 20px;
      color: #fff;
    }
    p {
      width: 136px;
      height: 36px;
      padding-right: 12px;
      display: flex;
      justify-content: space-between;
    }
    a {
      color: $primary-blue;
      text-decoration: underline;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>