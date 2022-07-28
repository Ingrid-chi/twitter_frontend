<template>
  <div class="">
    <img :src="this.logoImage" alt="" />
    <form autocomplete="off" class="" @submit.prevent.stop="handleSubmit">
      <div class="">
        <h1 class="">登入Alphitter</h1>
      </div>

      <div class="">
        <label for="">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="account"
          placeholder="請輸入帳號"
          maxlength="50"
        />
      </div>

      <div class="">
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

      <button class="" :disabled="isProcessing" type="submit">登入</button>

      <div class="">
        <p>
          <router-link to="/signup"> 註冊 </router-link>
          <router-link to="/admin/signin"> 後台登入 </router-link>
        </p>
      </div>
    </form>
  </div>
</template>
<script>
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
    handleSubmit() {
      if (!this.account || !this.password) {
        console.log("請輸入帳密");
      }
      if (this.account.length >= 50 || this.password >= 50) {
        console.log("帳號或密碼字數需50字以下");
      }
      this.isProcessing = true;
      const data = JSON.stringify({
        email: this.email,
        password: this.password,
      });
      // TODO: 向後端驗證使用者登入資訊是否合法
      console.log("data", data);
    },
  },
};
</script>
