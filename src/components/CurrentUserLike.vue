<template>
  <div class="currentUserLike-wrapper">
    <div
      class="like-container-for"
      v-for="likedTweet in likedTweets"
      :key="likedTweet.id"
    >
      <div class="like-container">
        <div class="like-container__avatar">
          <img :src="likedTweet.Tweet.User.avatar" alt="" />
        </div>

        <div class="like-container__detail">
          <!-- title -->
          <div class="like-container__detail__title">
            <label class="like-container__detail__title__name primary-bold">{{
              likedTweet.Tweet.User.name
            }}</label>
            <label class="like-container__detail__title__account"
              >{{ "@" + likedTweet.Tweet.User.account }}．</label
            >
            <label class="like-container__detail__title__created-at"
              >{{ likedTweet.createdAt }}
            </label>
          </div>

          <!-- description -->
          <p class="like-container__detail__description">
            {{ likedTweet.Tweet.description }}
          </p>

          <!-- reply & like icon -->
          <div class="like-container__detail__count-panel">
            <!-- reply icon -->
            <div class="like-container__detail__count-panel__reply">
              <div class="like-container__detail__count-panel__reply__icon">
                <img src="./../assets/replied.png" alt="" />
              </div>
              <div class="like-container__detail__count-panel__reply__count">
                {{ likedTweet.Tweet.repliesCount }}
              </div>
            </div>

            <!-- like icon -->
            <div class="like-container__detail__count-panel__like">
              <button
                v-if="likedTweet.isLike"
                @click.stop.prevent="deleteLike(likedTweet.id)"
                class="like-container__detail__count-panel__like__icon"
              >
                <img src="./../assets/like.png" alt="" />
              </button>

              <button
                v-else
                @click.stop.prevent="addLike(likedTweet.id)"
                class="like-container__detail__count-panel__like__icon"
              >
                <img src="./../assets/like-checked.png" alt="" />
              </button>
              <div class="like-container__detail__count-panel__like__count">
                {{ likedTweet.Tweet.likesCount }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="currentUserLike-wrapper__bottom"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "../apis/users";
import { Toast } from "../utils/helpers";

export default {
  name: "CurrentUserLike",

  components: {},

  data() {
    return {
      likedTweets: [],
    };
  },

  created() {
    console.log(this.currentUser);
    this.fetchCurrentUserLike(this.currentUser.id);
  },

  methods: {
    async fetchCurrentUserLike(id) {
      try {
        const response = await usersAPI.getUserLikes(id);
        console.log(response);
        this.likedTweets = response.likedTweets;
        console.log(this.likedTweets);
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

    async addLike(id) {
      try {
        await usersAPI.addTweetLike(id);
        this.likedTweets = this.likedTweets.map((likedTweet) => {
          if (likedTweet.id === id) {
            return {
              ...likedTweet,
              isLike: true,
              likesCount: likedTweet.likesCount + 1,
            };
            
          } else {
            return likedTweet;
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

    async deleteLike(id) {
      try {
        await usersAPI.deleteTweetLike(id);
        this.likedTweets = this.likedTweets.map((likedTweet) => {
          if (likedTweet.id === id) {
            return {
              ...likedTweet,
              isLike: false,
              likesCount: likedTweet.likesCount - 1,
            };
          } else {
            return likedTweet;
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
  },

  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style lang="scss" scoped>
.currentUserLike-wrapper {
  &__bottom {
    @extend %line-bottom;
  }
}

.like-container {
  display: flex;
  flex-direction: row;
  padding: 16px 24px;
  &__avatar {
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }

  &__detail {
    padding-left: 8px;
    &__title {
      padding-bottom: 8px;
      &__name {
        @extend %primary-p;
        color: $main-black;
        padding-right: 8px;
      }
      &__account,
      &__created-at {
        @extend %secondary-p;
        color: $secondary-gray;
      }
    }

    &__description {
      @extend %secondary-p;
      color: $main-black;
      line-height: 26px;
      padding-bottom: 8px;
    }

    // reply & like icon
    &__count-panel {
      display: flex;
      align-items: center;
      &__reply {
        display: flex;
        align-items: center;
        padding-right: 40px;
        &__icon {
          img {
            width: 13.17px;
            height: 13.17px;
          }
        }
        &__count {
          @extend %secondary-p;
          color: $secondary-gray;
          padding-left: 9px;
        }
      }

      &__like {
        display: flex;
        align-items: center;
        &__icon {
          img {
            width: 13.4px;
            height: 12.61px;
          }
        }
        &__count {
          @extend %secondary-p;
          color: $secondary-gray;
          padding-left: 9px;
        }
      }
    }
  }
}
</style>
