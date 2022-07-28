<template>
  <div class="wrapper">

    <div class="navBar">
        <div class="navBar__logo">
          <img class="navBar__logo__img" src="./../assets/logo.png" alt="">
        </div>

        <NavTab />
        <AdminNavTab />

        <div class="navBar__sign-out">
          <img
           class="navBar__sign-out__img"
           src="./../assets/sign-out.png" width="18" height="18" alt="">
          <h5>登出</h5>
        </div>
    </div>

  </div>
</template>

<script>
import NavTab from './../components/NavTab';

export default {
  name: "NavBar",

  components: {
    NavTab,
  },

};
</script>

<style lang="scss" scoped>
.navBar {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__logo {
    padding: 13px 0px 30px 13px;
    &__img {
      width: 40px;
      height: 40px;
    }
  }

  &__sign-out {
    display: flex;
    align-items: center;
    color: $primary-black;
    padding: 0px 0px 20px 19px;
    &__img {
      width: 18px;
      height: 18px;
      margin-right: 19px;
    }
  }
}
</style>