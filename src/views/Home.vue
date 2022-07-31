<template>
  <div class="wrapper">
    <div class="home">
      <NavBar />
      <div class="home__container">
        <div class="home__container__line-left"></div>
        <div class="home__container__content">
          <div class="content__wrapper__title">
            <h4 class="content__title">首頁</h4>
          </div>
          <div class="content__wrapper__tweet">
            <div class="content__tweet">
              <img
                class="content__tweet__img"
                src="https://randomuser.me/api/portraits/lego/2.jpg"
                alt="userImg"
              />
              <input
                class="content__tweet__input"
                type="text"
                placeholder="有甚麼新鮮事?"
              />
            </div>
            <button class="content__btn">推文</button>
          </div>
        </div>
        <div class="home__container__line-right"></div>
      </div>
      <PopularUser />
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";
import PopularUser from "./../components/PopularUser";
export default {
  components: {
    NavBar,
    PopularUser,
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}
.home {
  height: 100vh;
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    padding: 0px 24px 0 20px;
    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }
    .content {
      &__wrapper {
        &__title {
          height: 72px;
          border-bottom: 1px solid $line-gray;
          padding-left: 23px;
        }
        &__tweet {
          position: relative;
          height: 136px;
          border-bottom: 10px solid $line-gray;
          padding-right: 24.69px;
        }
      }
      &__title {
        line-height: 72px;
      }
      &__tweet {
        padding: 16px 24.69px 16px 26.49px;
        display: flex;
        &__img {
          width: 50px;
          height: 50px;
          margin-right: 8px;
          border-radius: 50%;
        }
        &__input {
          width: 100%;
          border: none;
          display: inline-block;
          line-height: 26px;
          font-weight: 700;
          font-size: 18px;
          color: $secondary-gray;
        }
      }
      &__btn {
        width: 64px;
        height: 40px;
        position: absolute;
        top: 72px;
        right: 24.69px;
        border-radius: 50px;
        background-color: $main-orange;
        line-height: 24px;

        color: white;
      }
    }
  }
}
</style>