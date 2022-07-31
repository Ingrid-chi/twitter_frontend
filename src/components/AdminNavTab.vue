<template>
  <div class="adminNavTab-wrapper">
    <div class="adminNavTab">
      <div
        class="adminNavTab__menu"
        v-for="adminMenuItem in adminMenuItems"
        :key="adminMenuItem.id"
        @click="changeTab(adminMenuItem.id)"
      >
        <img
          class="adminNavTab__menu__img"
          :src="getImg(adminMenuItem.image)"
          alt=""
        />
        <router-link :to="adminMenuItem.path">
          <h5
            :class="[
              'adminNavTab__menu__title',
              { checked: adminMenuItem.id === currentTagId },
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
      currentTagId: 1,
    };
  },

  methods: {
    getImg(img) {
      return require(`../assets/${img}`);
    },
    changeTab(tabId) {
      this.currentTagId = tabId;
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
    display: flex;
    align-items: center;
    color: $primary-black;
    padding: 0 0 40px 17px;
    cursor: pointer;
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
</style>
