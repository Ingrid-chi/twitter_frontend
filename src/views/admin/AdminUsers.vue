<template>
  <div class="list-wrapper">
    <NavBar :isAdmin="true" />
    <div class="users-list">
      <div class="users-list__header">
        <h4>使用者列表</h4>
      </div>
      <div class="users-list__content">
        <AdminUserListCard v-for="user in users" :key="user.id" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar";
import AdminUserListCard from "../../components/admin/AdminUserListCard";
import adminAPI from "../../apis/admin";
import { Toast } from "../../utils/helpers";

export default {
  name: "UsersList",
  components: {
    NavBar,
    AdminUserListCard,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await adminAPI.users.get();
        const { data } = response;

        if (response.status !== "Success") {
          throw new Error(response.message);
        }

        this.users = data;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得使用者列表，請稍後再試",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;

  display: grid;
  grid-template-columns: 178px 1fr;
  column-gap: 24px;
  // max-height: 100vh;
  // min-height: 100vh;
  // display: grid;
  // grid-auto-flow: column;
  // grid-auto-columns: max-content 1fr;
  // column-gap: 24px;
  // padding-left: 130px;
}

.users-list {
  border-left: 1px solid $line-gray;
  max-height: 100vh;
  min-height: 100vh;

  &__header {
    position: fixed;
    background-color: $white;
    width: 100%;

    z-index: 3;

    padding: 24px;
    border-bottom: 1px solid $line-gray;
  }

  &__content {
    padding-top: 100px;
    padding-left: 16px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(249px, 1fr));
    row-gap: 16px;

    max-height: 100vh;
    overflow: scroll;
  }
}
</style>
