<template>
  <div class="signin signin__container">
    <div class="signin__container__img">
      <img :src="this.logoImage" alt="" />
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
</template>
<script>
import authorizationAPI from "./../apis/authorization";
export default {
  data() {
    return {
      account: "",
      password: "",
      logoImage: require("../../public/alpha-icon@2x.png"),
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.account || !this.password) {
          console.log("不要空");
        }
        this.isProcessing = true;
        const response = await authorizationAPI.signIn({
          email: this.account,
          password: this.password,
        });
        const { data } = response;
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        console.log("data", data);
        // 將伺服器回傳的 token 保存在 localStorage 中
        localStorage.setItem("token", data.token);
        // 透過 setCurrentUser 把使用者資料存到 Vuex 的 state 中
        // this.$store.commit('setCurrentUser', data.user)
        // 成功登入後進行轉址
        this.$router.push("/signup");
      } catch (error) {
        this.isProcessing = false;
        this.password = "";
        // 顯示錯誤提示
        // Toast.fire({
        //   icon: 'warning',
        //   title: '輸入的帳號密碼有誤'
        // })
        console.error(error.message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// %form-row-wrapper
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
        height: 52px;
        margin-top: 40px;
        background-color: #f5f8fa;
        label {
          @extend %primary-p;
          display: block;
          text-align: left;
        }
        input {
          @extend %secondary-p;
          display: block;
        }
      }
      &__password {
        margin-top: 32px;
      }
      &__btn {
        margin-top: 40px;
      }
      &__links {
        margin-top: 22px;
      }
    }
  }
}
</style>