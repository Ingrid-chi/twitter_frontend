<template>
  <div class="">
    <img :src="this.logoImage" alt="" />
    <form autocomplete="off" class="" @submit.prevent.stop="handleSubmit">
      <div class="">
        <h1 class="">建立你的帳號</h1>
      </div>

      <div class="">
        <label for="account">帳號</label>
        <input
          id="account"
          v-model="account"
          name="account"
          type="text"
          class=""
          placeholder="請輸入帳號"
          autofocus
        />
      </div>
       <div class="">
        <label for="name">名稱</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class=""
          placeholder="請輸入使用者名稱"
          autofocus
        >
      </div>

      <div class="">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class=""
          placeholder="請輸入Email"
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
          placeholder="請設定密碼"
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
        </p>
      </div>
    </form>
  </div>
</template>