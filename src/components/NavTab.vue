<template>
  <div class="navTab-wrapper">
    <div class="navTab">
      <div
        class="navTab__menu"
        v-for="menuItem in menuItems"
        :key="menuItem.id"
      >
        <router-link
          class="navTab__menu__link"
          :to="
            menuItem.path
              ? menuItem.path === '/setting'
                ? `/${userId}${menuItem.path}`
                : menuItem.path
              : `/${userId}`
          "
        >
          <img
            class="navTab__menu__link__img"
            :src="getImg(menuItem.image)"
            alt=""
          />

          <h5
            :class="[
              'navTab__menu__link__title',
              { checked: menuItem.path === currentTabPath },
            ]"
          >
            {{ menuItem.title }}
          </h5>
        </router-link>
      </div>

      <button class="navTab__btn" @click="showModal">推文</button>
    </div>
    <MainModal v-show="show" @hide-modal="hideModal" @submit="submit">
    </MainModal>
  </div>
</template>

<script>
import { menuItems } from "../configs/contentConfigs";
import MainModal from "./../components/MainModal";
export default {
  name: "NavTab",

  data() {
    return {
      menuItems,
      show: false,
      currentTabPath: null,
    };
  },
  components: {
    MainModal,
  },

  props: {
    userId: {
      type: Number,
      require: true,
    },
  },

  created() {
    this.currentTabPath = this.$route.params.userId;
  },

  methods: {
    getImg(img) {
      return require(`../assets/${img}`);
    },
    hideModal() {
      this.show = false;
    },
    showModal() {
      this.show = true;
    },
    submit() {
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.navTab {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__menu {
    padding: 0 0 40px 17px;
    cursor: pointer;

    &__link {
      display: flex;
      align-items: center;

      &__img {
        width: 20px;
        height: 20px;
      }

      &__title {
        padding-left: 17px;
        &:hover,
        &.checked {
          color: $main-orange;
        }
      }
    }
  }

  // 修改 router-link 顏色
  a {
    text-decoration: none;
    color: $primary-black;
  }

  &__btn {
    width: 178px;
    height: 46px;
    border-radius: 50px;
    background-color: $main-orange;
    color: $white;
    font-size: 20px;
    font-weight: 400;
  }
}
</style>