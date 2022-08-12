<template>
  <div class="navBar-wrapper">
    <div class="navBar">
      <div class="navBar__menu">
        <div class="navBar__menu__logo">
          <img class="navBar__logo__img" src="./../assets/logo.png" alt="" />
        </div>

        <!-- 前後台的 NavTab -->
        <NavTab v-if="!isAdmin" :userId="userId" />
        <AdminNavTab v-else />
      </div>

      <div class="navBar__sign-out" @click.stop.prevent="handleLogOut()">
        <img
          class="navBar__sign-out__img"
          src="./../assets/sign-out.png"
          width="18"
          height="18"
          alt=""
        />
        <h5>登出</h5>
      </div>
    </div>
  </div>
</template>

<script>
import NavTab from "./../components/NavTab";
import AdminNavTab from "./../components/AdminNavTab";
import { mapState } from "vuex";

export default {
  name: "NavBar",

  components: {
    NavTab,
    AdminNavTab,
  },

  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      userId: 0,
    };
  },
  computed: {
    ...mapState(["currentUser", "isAuthenticated"]),
  },

  async created() {
    this.userId = this.currentUser.id;
  },

  methods: {
    handleLogOut() {
      if (this.isAdmin) {
        localStorage.removeItem("admin-token");
        this.$router.push({ name: "admin-signin" });
      } else {
        localStorage.removeItem("token");
        this.$router.push({ name: "sign-in" });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.navBar {
  // position: fixed;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__menu {
    &__logo {
      width: 40px;
      height: 40px;
      margin: 13px 0px 30px 13px;
    }
  }

  &__sign-out {
    display: flex;
    align-items: center;
    color: $primary-black;
    padding: 0px 0px 20px 19px;
    cursor: pointer;
    &__img {
      width: 18px;
      height: 18px;
      margin-right: 19px;
    }
  }
}
</style>