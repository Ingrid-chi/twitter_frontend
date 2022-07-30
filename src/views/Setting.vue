<template>
  <div class="wrapper">
    <div class="setting">
      <NavBar />
      <div class="setting__container">
        <div class="setting__container__line-left"></div>
        <div class="setting__container__content">
          <form
            autocomplete="off"
            class="setting__form"
            @submit.prevent.stop="handleSubmit"
          >
            <div class="setting__form__wrapper__title">
              <h3 class="setting__form__title">帳號設定</h3>
            </div>

            <div class="setting__form__wrapper__account">
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
            <div class="setting__form__wrapper__name">
              <label for="name">名稱</label>
              <input
                id="name"
                v-model="name"
                name="name"
                type="text"
                placeholder="請輸入使用者名稱"
              />
            </div>

            <div class="setting__form__wrapper__email">
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

            <div class="setting__form__wrapper__password">
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

            <div class="setting__form__wrapper__password-check">
              <label for="password-check">密碼確認</label>
              <input
                id="password-check"
                v-model="passwordCheck"
                name="passwordCheck"
                type="password"
                placeholder="請再次輸入密碼"
              />
            </div>
            <div class="setting__form__wrapper__btn">
              <button
                class="setting__form__btn"
                :disabled="isProcessing"
                type="submit"
              >
                儲存
              </button>
            </div>
          </form>
        </div>
        <div class="setting__container__line-right"></div>
      </div>
    </div>
  </div>
</template>
<script>
import NavBar from "./../components/NavBar";

export default {
  components: {
    NavBar,
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
.setting {
  height: 100vh;
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    // padding: 24px 23px 0 23px;
    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }
    &__content {
      padding: 24px 23px 0 23px;
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
        margin-top: 40px;
        display: flex;
        justify-content: flex-end;
      }
    }
    &__btn {
      height: 46px;
      width: 88px;
      margin: 0;
      padding: 0;
      border-radius: 50px;
      background-color: $main-orange;
      font-weight: 400;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>