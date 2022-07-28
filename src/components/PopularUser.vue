<template>
  <div class="wrapper">

    <div class="popularUserList">
      <h4 class="popularUserList__title">推薦跟隨</h4>
      <div class="popularUserList__line"></div>
      <div 
      class="popularUserList__container"
      v-for="user in users"
      :key="user.id"
      >

        <div class="popularUserList__container__img">
          <img :src="user.image" alt="">
        </div>

        <div class="popularUserList__container__nameDetail">
           <p class="popularUserList__container__nameDetail__name primary-bold">{{ user.name }}</p>
           <p class="popularUserList__container__nameDetail__account secondary-bol">{{ user.account }}</p>
        </div>

        <button class="popularUserList__container__btn">跟隨</button>
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
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 2,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 3,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 4,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 5,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 6,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 7,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
    {
      id: 8,
      name: "Pizza Hut",
      account: "@pizzahut",
      isFollowing: false,
      image: "logo-gary.png",
    },
  ]
};

export default {
  name: "PopularUser",

  components: {
  },

  data() {
    return {
    users: dummyData.users,
    }
  },

    methods: {
    
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
  background-color: #FAFAFB;
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
    &__btn {
      @extend %primary-p;
      color: $main-orange;
      padding: 8px 16px;
      border: 1px solid $main-orange;
      border-radius: 50px;
    }
  }
}
</style>