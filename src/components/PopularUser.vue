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
        <div class="popularUserList__container__img">
          <img :src="user.image" alt="" />
        </div>

        <div class="popularUserList__container__nameDetail">
          <p class="popularUserList__container__nameDetail__name primary-bold">
            {{ user.name }}
          </p>
          <p
            class="popularUserList__container__nameDetail__account secondary-bol"
          >
            {{ user.account }}
          </p>
        </div>

        <button
          class="popularUserList__container__btnFollowed"
          v-if="user.isFollowed"
          type="button"
          @click.stop.prevent="deleteFollow(user.id)"
        >
          正在跟隨
        </button>

        <button
          class="popularUserList__container__btnUnfollowed"
          v-else
          type="button"
          @click.stop.prevent="addFollow(user.id)"
        >
          跟隨
        </button>
      </div>
    </div>
  </div>
</template>

<script>
const dummyData = {
  users: [
    {
      id: 1,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: true,
    },
    {
      id: 2,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: true,
    },
    {
      id: 3,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
    {
      id: 4,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
    {
      id: 5,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
    {
      id: 6,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
    {
      id: 7,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
    {
      id: 8,
      name: "Pizza Hut",
      account: "@pizzahut",
      image: "logo-gary.png",
      isFollowed: false,
    },
  ],
};

export default {
  name: "PopularUser",

  components: {},

  data() {
    return {
      users: dummyData.users,
    };
  },

  methods: {
    addFollow(userId) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: true,
          };
        }

        return user;
      });
    },

    deleteFollow(userId) {
      this.users = this.users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            isFollowed: false,
          };
        }

        return user;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.popularUserList {
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 273px;
  border-radius: 16px;
  background-color: #fafafb;
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
      width: 32px;
      height: 32px;
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
</style>
