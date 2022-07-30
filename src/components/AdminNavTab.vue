<template>
  <div class="wrapper">

    <div class="adminNavTab">
        <div class="adminNavTab__menu"
        v-for="adminMenuItem in adminMenuItems" 
          :key="adminMenuItem.id">
          <img 
          class="adminNavTab__menu__img"
          :src="getImg(adminMenuItem.image)" alt="" />
          <h5 class="adminNavTab__menu__title">{{ adminMenuItem.title }}</h5>
        </div>
    </div>

  </div>
</template>

<script>
import { adminMenuItems } from '../configs/contentConfigs';

export default {
  name: "AdminNavTab",

  data() {
    return {
    adminMenuItems: adminMenuItems,
    }
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
    display: flex;
    align-items: center;
    color: $primary-black;
    padding: 0 0 40px 17px;
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