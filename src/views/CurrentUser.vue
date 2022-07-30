<template>
  <div class="wrapper">
    <div class="CurrentUser">
      <NavBar />

      <div class="CurrentUser__container">

        <div class="CurrentUser__container__line-left"></div>

        <div class="CurrentUser__container__content">
          <CurrentUserInfo />

          <CurrentUserTweets />
          <CurrentUserReplies />
          <CurrentUserLikes />
        </div>

        <div class="CurrentUser__container__line-right"></div>
      </div>

      <PopularUser />
    </div>
  </div>
</template>

<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
import CurrentUserInfo from "./../components/CurrentUserInfo";

export default {
  name: "CurrentUser",

  components: {
    NavBar,
    PopularUser,
    CurrentUserInfo,
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}

.CurrentUser {
  display: grid;
  grid-template-columns: 178px auto 273px;

  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    padding: 0 24px 0 20px;
    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }
  }
}
</style>
