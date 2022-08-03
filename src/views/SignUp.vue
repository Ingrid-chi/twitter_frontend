<template>
  <div class="wrapper">
    <div class="signup signup__container">
      <div class="signup__container__img">
        <img :src="logoImage" :alt="logo.title" />
      </div>
      <form
        autocomplete="off"
        class="signup__form"
        @submit.prevent.stop="handleSubmit"
      >
        <div class="signup__form__wrapper__title">
          <h3 class="signup__form__title">建立你的帳號</h3>
        </div>

        <div class="signup__form__wrapper__account">
          <label for="account">帳號</label>
          <input
            id="account"
            v-model="account"
            name="account"
            type="text"
            placeholder="請輸入帳號"
            maxlength="50"
            autofocus
          />
        </div>
        <div class="signup__form__wrapper__name">
          <label for="name">名稱</label>
          <input
            id="name"
            v-model="name"
            name="name"
            type="text"
            placeholder="請輸入使用者名稱"
          />
        </div>

        <div class="signup__form__wrapper__email">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            name="email"
            type="email"
            placeholder="請輸入Email"
            autofocus
          />
        </div>

        <div class="signup__form__wrapper__password">
          <label for="password">密碼</label>
          <input
            id="password"
            v-model="password"
            name="password"
            type="password"
            placeholder="請設定密碼"
            autofocus
          />
        </div>

        <div class="signup__form__wrapper__password-check">
          <label for="password-check">密碼確認</label>
          <input
            id="password-check"
            v-model="passwordCheck"
            name="passwordCheck"
            type="password"
            placeholder="請再次輸入密碼"
          />
        </div>
        <div class="signup__form__wrapper__btn">
          <button
            class="signup__form__btn"
            :disabled="isProcessing"
            type="submit"
          >
            註冊
          </button>
        </div>

        <div class="signup__form__wrapper__link">
          <p>
            <router-link to="/signin">取消 </router-link>
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
      email: "",
      name: "",
      passwordCheck: "",
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
    name() {
      if (this.name.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.name = "";
        return;
      }
    },
    email() {
      if (this.email.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.email = "";
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
    passwordCheck() {
      if (this.passwordCheck.length >= 50) {
        Toast.fire({
          icon: "error",
          title: "字數上限為50字",
        });
        this.passwordCheck = "";
        return;
      }
    },
  },
  methods: {
    async handleSubmit() {
      try {
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          Toast.fire({
            icon: "error",
            title: "請輸入所有欄位",
          });
          return;
        }
        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: "error",
            title: "兩次輸入的密碼不同",
          });
          return;
        }
        this.isProcessing = true;

        const response = await authorizationAPI.signUp({
          email: this.email,
          account: this.account,
          name: this.name,
          password: this.password,
          checkPassword: this.passwordCheck,
        });

        Toast.fire({
          icon: "success",
          title: "成功註冊",
        });

        // 成功登入後進行轉址
        this.$router.push("/signin");
        console.log("response", response);

        // if (response.status === "error") {
        //   // 錯誤處理
        //   throw new Error(response.message);
        // }
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
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
.signup {
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
      &__name {
        margin-top: 32px;
        @extend %form-wrapper;
      }
      &__email {
        margin-top: 32px;
        @extend %form-wrapper;
      }
      &__password {
        margin-top: 32px;
        @extend %form-wrapper;
      }
      &__password-check {
        margin-top: 32px;
        @extend %form-wrapper;
      }
      &__btn {
        height: 46px;
        margin-top: 40px;
        border-radius: 50px;
        background-color: $main-orange;
      }
      &__link {
        @extend %primary-p;
        margin-top: 22px;
        display: flex;
        justify-content: center;
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
      width: 32px;
      height: 24px;
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

