<template>
  <div class="popularUser-wrapper">
    <div class="popularUserList">
      <h4 class="popularUserList__title">推薦跟隨</h4>
      <div class="popularUserList__line"></div>
      <div
        class="popularUserList__container"
        v-for="user in users"
        :key="user.id"
      >
        <!-- ** @TODO 修改 name ** -->
        <!-- <router-link 
      :to="{ name: (user.name), params: { id: user.id } }"
      class="popularUserList-link"
      > -->
        <router-link :to="`/${user.id}`" class="popularUserList-link">
          <div class="popularUserList__container__img">
            <img :src="user.avatar" alt="" />
          </div>

          <div class="popularUserList__container__nameDetail">
            <p
              class="popularUserList__container__nameDetail__name primary-bold"
            >
              {{ user.name }}
            </p>
            <p
              class="
                popularUserList__container__nameDetail__account
                secondary-bol
              "
            >
              {{ user.account }}
            </p>
          </div>
        </router-link>

        <button
          class="popularUserList__container__btnFollowed"
          v-if="user.isFollowing"
          type="button"
          @click.stop.prevent="deleteFollowing(user.id)"
        >
          正在跟隨
        </button>

        <button
          class="popularUserList__container__btnUnfollowed"
          v-else
          type="button"
          @click.stop.prevent="addFollowing(user.id)"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "PopularUser",

  components: {},

  data() {
    return {
      users: [],
    };
  },

  created() {
    this.fetchPopularUsers();
  },

  methods: {
    async fetchPopularUsers() {
      try {
        const response = await usersAPI.getPopularUsers();
        const { users } = response;
        this.users = users;
        // console.log("response", response);
      } catch (error) {
        const { response } = error;
        if (response.data.message && localStorage.getItem("token")) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },

    async addFollowing(id) {
      try {
        await usersAPI.addFollowing({ id });
        // const response = await usersAPI.addFollowing({
        //   id,
        // });
        // console.log("response", response);
        this.users = this.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isFollowing: true,
            };
          } else {
            return user;
          }
        });

        // console.log("popular", this.popularUsers);
        this.$store.commit("setFollowUsers", this.users);
      } catch (error) {
        const { response } = error;
        if (response.data.message) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },

    async deleteFollowing(id) {
      try {
        await usersAPI.deleteFollowing(id);
        // const response = await usersAPI.deleteFollowing(id);
        // console.log("response", response);
        this.users = this.users.map((user) => {
          if (user.id === id) {
            return {
              ...user,
              isFollowing: false,
            };
          } else {
            return user;
          }
        });
        this.$store.commit("setFollowUsers", this.users);
      } catch (error) {
        const { response } = error;
        if (response.data.message) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },
  },

  computed: {
    ...mapState(["followUsers"]),
  },

  watch: {
    followUsers: {
      handler: function () {
        // console.log('here');

        this.fetchPopularUsers();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.popularUserList {
  display: flex;
  flex-direction: column;
  width: 273px;
  border-radius: 16px;
  background-color: #fafafb;
  margin-top: 16px;
  &__title {
    color: $main-black;
    padding: 24px 0 24px 24px;
  }
  &__line {
    width: 273px;
    height: 1px;
    background-color: $line-gray;
  }
  &__container {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    &__img {
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
    }
    &__nameDetail {
      position: absolute;
      left: 56px;
      &__name {
        @extend %primary-p;
        color: $main-black;
      }
      &__account {
        @extend %secondary-p;
        color: $third-gray;
      }
    }
    &__btnUnfollowed {
      @extend %btn-default;
    }
    &__btnFollowed {
      @extend %btn-checked;
    }
  }
}

.popularUserList-link {
  display: flex;
  align-items: center;
}
</style>
