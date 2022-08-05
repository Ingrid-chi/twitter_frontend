<template>
  <div class="followersList">
    <div
      v-for="follower in followers"
      :key="follower.id"
      class="followersList-wrapper"
    >
      <div class="followersList-content">
        <div class="followersList-content__avatar">
          <img :src="follower.avatar" alt="" />
        </div>

        <div class="followersList-content__detail">
          <p class="followersList-content__detail__name primary-bold">
            {{ follower.name }}
          </p>
          <p class="followersList-content__detail__description">
            {{ follower.introduction }}
          </p>
        </div>

        <button
          v-if="follower.isFollowing"
          @click.stop.prevent="deleteFollowing(follower.followerId)"
          class="followersList-content__btn-checked"
        >
          正在跟隨
        </button>

        <button 
        v-else 
        @click.stop.prevent="addFollowing(follower.followerId)"
        class="followersList-content__btn-default"
        >
        跟隨
        </button>

      </div> 

      <div class="line-bottom"></div>
    </div>
  </div>
</template>

<script>
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "CurrentUserFollowersList",

  data() {
    return {
      followers: [],
    };
  },

  props: {
    userId: {
      type: Number,
      require: true,
    },
  },

  created() {
    this.fetchFollowers();
  },

  methods: {
    async fetchFollowers() {
      try {
        const response = await usersAPI.getUserFollowers(this.userId);
        const { data } = response;
        console.log({ response });
        this.followers = data;
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

    async addFollowing(id) {
      try {
        const response = await usersAPI.addFollowing({
          id,
        });
        console.log("response", response);
        this.followers = this.followers.map((follower) => {
          if (follower.followerId === id) {
            return {
              ...follower,
              isFollowing: true,
            };
          } else {
            return follower;
          }
        });
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
        const response = await usersAPI.deleteFollowing(id);
        console.log("response", response);
        this.followers = this.followers.map((follower) => {
          if (follower.followerId === id) {
            return {
              ...follower,
              isFollowing: false,
            };
          } else {
            return follower;
          }
        });
        return
      } catch (error) {
        const { response } = error;
        console.log(response)
        if (response) {
          Toast.fire({
            icon: "error",
            title: response.data.message,
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// 追隨者 & 正在追隨 內容
.followersList-content {
  padding: 16px 30px 16px 23px;
  position: relative;
  display: grid;
  grid-template-columns: 50px 1fr;

  &__avatar {
    img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    }
  }

  &__detail {
    padding: 0 0 15px 8px;

    &__name,
    &__description {
      padding-top: 8px;
      @extend %primary-p;
      color: $main-black;
      line-height: 26px;
    }
  }

  &__btn-checked {
    position: absolute;
    top: 16px;
    right: 30px;
    @extend %btn-checked;
  }
  &__btn-default {
    position: absolute;
    top: 16px;
    right: 30px;
    @extend %btn-default;
  }
}

// 底線
.line-bottom {
  @extend %line-bottom;
}
</style>
