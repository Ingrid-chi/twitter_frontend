<template>
  <div class="adminNavTab-wrapper">
    <div class="adminNavTab">
      <div
        class="adminNavTab__menu"
        v-for="adminMenuItem in adminMenuItems"
        :key="adminMenuItem.id"
      >
      <router-link 
      class="adminNavTab__menu__link"
      :to="adminMenuItem.path">
        <img
          class="adminNavTab__menu__link__img"
          :src="getImg(adminMenuItem.image)"
          alt=""
        />
        
          <h5
            :class="[
              'adminNavTab__menu__link__title',
              { checked: adminMenuItem.path === currentTabPath },
            ]"
          >
            {{ adminMenuItem.title }}
          </h5>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { adminMenuItems } from "../configs/contentConfigs";

export default {
  name: "AdminNavTab",

  data() {
    return {
      adminMenuItems: adminMenuItems,
      currentTabPath: '/admin/tweets'
    };
  },

  created() {
    this.currentTabPath = this.$route.path
  },

  methods: {
    getImg(img) {
      return require(`../assets/${img}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.adminNavTab {
  height: 100%;
  display: flex;
  flex-direction: column;

  &__menu {
    // display: flex;
    // align-items: center;
    // color: $primary-black;
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
}
</style>
