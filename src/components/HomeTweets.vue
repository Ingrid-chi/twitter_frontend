<template>
  <div class="currentUserTweets-wrapper">
    <router-link :to="`/tweets/${tweet.id}`">
      <div class="tweets-container-for">
        <div class="tweets-container">
          <router-link :to="`/${tweet.UserId}`">
            <div class="tweets-container__avatar">
              <img :src="tweet.User.avatar" alt="" />
            </div>
          </router-link>
          <div class="tweets-container__detail">
            <!-- title -->
            <div class="tweets-container__detail__title">
              <label
                class="tweets-container__detail__title__name primary-bold"
                >{{ tweet.User.name }}</label
              >
              <label class="tweets-container__detail__title__account"
                >{{ '@' + tweet.User.account }}．</label
              >
              <label class="tweets-container__detail__title__created-at"
                >{{ tweet.createdAt | fromNow }}
              </label>
            </div>

            <!-- like icon -->
            <div class="tweets-container__detail__count-panel__like">
              <button
                v-if="tweet.isLike"
                @click.stop.prevent="deleteLike(tweet.id)"
                class="tweets-container__detail__count-panel__like__icon"
              >
                <img src="./../assets/like-checked.png" alt="" />
              </button>
              <!-- description -->
              <p class="tweets-container__detail__description">
                {{ tweet.description }}
              </p>

              <!-- reply & like icon -->
              <div class="tweets-container__detail__count-panel">
                <!-- reply icon -->
                <div class="tweets-container__detail__count-panel__reply">
                  <div
                    class="tweets-container__detail__count-panel__reply__icon"
                  >
                    <img :src="tweet.avatar" alt="" />
                  </div>
                  <div
                    class="tweets-container__detail__count-panel__reply__count"
                  >
                    <!-- here -->
                    {{ tweet.replyCount }}
                  </div>
                </div>

                <!-- like icon -->
                <div class="tweets-container__detail__count-panel__like">
                  <button
                    v-if="tweet.isLike"
                    @click.stop.prevent="unLike(tweet.id)"
                    class="tweets-container__detail__count-panel__like__icon"
                  >
                    <img src="./../assets/like-checked.png" alt="" />
                  </button>

                  <button
                    v-else
                    @click.stop.prevent="addLike(tweet.id)"
                    class="tweets-container__detail__count-panel__like__icon"
                  >
                    <img src="./../assets/like.png" alt="" />
                  </button>
                  <div
                    class="tweets-container__detail__count-panel__like__count"
                  >
                    <!-- here -->
                    {{ tweet.likeCount }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="currentUserTweets-wrapper__bottom"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { fromNowFilter } from './../utils/mixins';
import { mapState } from 'vuex';
import usersAPI from '../apis/users';
import { Toast } from '../utils/helpers';

export default {
  name: 'CurrentUserTweets',
  mixins: [fromNowFilter],
  components: {},
  props: {
    tweet: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    async addLike(id) {
      try {
        await usersAPI.addTweetLike(id);
        this.tweet = this.tweet.map((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              isLike: true,
              likesCount: tweet.likesCount + 1,
            };
          } else {
            return tweet;
          }
        });
      } catch (error) {
        const { response } = error;
        if (response.data.message) {
          Toast.fire({
            icon: 'error',
            title: response.data.message,
          });
        }
      }
    },
    async deleteLike(id) {
      try {
        await usersAPI.deleteTweetLike(id);
        this.tweet = this.tweet.map((tweet) => {
          if (tweet.id === id) {
            return {
              ...tweet,
              isLike: false,
              likesCount: tweet.likesCount - 1,
            };
          } else {
            return tweet;
          }
        });
      } catch (error) {
        const { response } = error;
        if (response.data.message) {
          Toast.fire({
            icon: 'error',
            title: response.data.message,
          });
        }
      }
    },

    // async addLike(id) {
    //   try {
    //     await usersAPI.addTweetLike(id);
    //     this.tweet.isLike = true;
    //   } catch (error) {
    //     console.log(error);
    //     Toast.fire({
    //       icon: "error",
    //       title: "目前無法新增 like, 請稍後再試",
    //     });
    //   }
    // },
    // async unLike(id) {
    //   try {
    //     await usersAPI.addTweetLike(id);
    //     this.tweet.isLike = true;
    //   } catch (error) {
    //     console.log(error);
    //     Toast.fire({
    //       icon: "error",
    //       title: "目前無法取消 like, 請稍後再試",
    //     });
    //   }
    // },
  },

  computed: {
    ...mapState(['currentUser']),
  },
};
</script>

<style lang="scss" scoped>
.currentUserTweets-wrapper {
  &__bottom {
    @extend %line-bottom;
  }
}

.tweets-container {
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
      // 新增段行
      word-break: break-word;
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