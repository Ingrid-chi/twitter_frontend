<template>
  <div class="followingList">
    <div
      v-for="following in followings"
      :key="following.id"
      class="followingList-wrapper"
    >
      <div class="followingList-content">
        <div class="followingList-content__avatar">
          <img :src="following.avatar" alt="" />
        </div>

        <div class="followingList-content__detail">
          <p class="followingList-content__detail__name primary-bold">
            {{ following.name }}
          </p>
          <p class="followingList-content__detail__description">
            {{ following.introduction }}
          </p>
        </div>

        <button
          v-if="following.isFollowing"
          @click.stop.prevent="deleteFollowing(following.followingId)"
          class="followingList-content__btn-checked"
        >
          正在跟隨
        </button>

        <button
          v-else
          @click.stop.prevent="addFollowing(following.followingId)"
          class="followingList-content__btn-default"
        >
          跟隨
        </button>
      </div>

      <div class="line-bottom"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "CurrentUserFollowingList",
  data() {
    return {
      followings: [],
    };
  },
  props: {
    userId: {
      type: Number,
      require: true,
    },
  },
  created() {
    this.fetchFollowings();
  },
  methods: {
    async fetchFollowings() {
      try {
        const response = await usersAPI.getUserFollowings(this.userId);
        const { data } = response;
        // console.log({ response });
        this.followings = data;
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
        await usersAPI.addFollowing({ id });
        this.followings = this.followings.map((following) => {
          if (following.followingId === id) {
            return {
              ...following,
              isFollowing: true,
            };
          } else {
            return following;
          }
        });
        this.$store.commit("setFollowUsers", this.followings);
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
        this.followings = this.followings.map((following) => {
          if (following.followingId === id) {
            return {
              ...following,
              isFollowing: false,
            };
          } else {
            return following;
          }
        });
        this.$store.commit("setFollowUsers", this.followings);
      } catch (error) {
        const { response } = error;
        // console.log(response);
        if (response) {
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
    followUsers: function () {
      // console.log(newValue);
      this.fetchFollowings();
    },
  },
};
</script>

<style lang="scss" scoped>
// 追隨者 & 正在追隨 內容
.followingList-content {
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
