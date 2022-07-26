<template>
  <div class="wrapper">
    <div class="tweet-replies">
      <NavBar />
      <div class="tweet-replies__container">
        <div class="tweet-replies__container__line-left"></div>
        <div class="tweet-replies__container__content">
          <div class="content__wrapper__title">
            <img class="content__icon-back" :src="backIcon" :alt="back.title" />
            <h4 class="content__title">推文</h4>
          </div>
          <TweetReply :tweet="tweet" />
          <div class="content__wrapper__reply-like-info">
            <!-- <div class="content__reply-like-text"> -->
            <div class="content__reply-nums">{{ tweet.replyCount }}</div>
            <div class="content__reply-text">回覆</div>
            <!-- </div> -->
            <!-- <div class="content__reply-like-icons"> -->
            <div class="content__like-nums">{{ tweet.likeCount }}</div>
            <div class="content__like-text">喜歡次數</div>
            <!-- </div> -->
          </div>
          <div class="content__wrapper__reply-like-icons">
            <img
              class="content__reply-icon"
              :src="replyIcon"
              :alt="reply.title"
              @click="showReplyModal"
            />
            <img
              v-if="tweet.isLike"
              class="content__like-icon"
              :src="checkedLikeIcon"
              :alt="checkedLikeIcon.title"
              @click.stop.prevent="deleteLike(tweet.id)"
            />
            <img
              v-else
              class="content__like-icon"
              :src="likeIcon"
              :alt="like.title"
              @click.stop.prevent="addLike(tweet.id)"
            />
          </div>

          <TweetReplyList
            v-for="reply in replies"
            :key="reply.id"
            :reply="reply"
            :tweet="tweet"
          />
        </div>
        <div class="tweet-replies__container__line-right"></div>
      </div>
      <PopularUser />
    </div>
    <ReplyModal
      v-show="replyShow"
      @hide-reply-modal="hideReplyModal"
      @submit-reply="submitReply"
      :tweet="tweet"
    >
    </ReplyModal>
  </div>
</template>
<script>
import NavBar from './../components/NavBar';
import PopularUser from './../components/PopularUser';
import TweetReply from './../components/TweetReply';
import TweetReplyList from './../components/TweetReplyList';
import ReplyModal from './../components/ReplyModal';
import { commonItems } from '../configs/commonConfigs';
import { Toast } from '../utils/helpers';

import tweetApis from '../apis/tweet';
import usersApis from '../apis/users';

//getTweetById
export default {
  name: 'TweetReplies',
  data() {
    return {
      replyShow: false,
      back: commonItems.back,
      reply: commonItems.reply,
      like: commonItems.like,
      checkedLike: commonItems.checkedLike,
      tweetId: 0,
      tweet: {},
      replies: [],
    };
  },
  async created() {
    await this.fetchTweetAndReplies();
  },
  components: {
    NavBar,
    PopularUser,
    TweetReply,
    TweetReplyList,
    ReplyModal,
  },
  computed: {
    backIcon() {
      return require(`../assets/${this.back.image}`);
    },
    replyIcon() {
      return require(`../assets/${this.reply.image}`);
    },
    likeIcon() {
      return require(`../assets/${this.like.image}`);
    },
    checkedLikeIcon() {
      return require(`../assets/${this.checkedLike.image}`);
    },
  },
  methods: {
    hideReplyModal() {
      this.replyShow = false;
    },
    showReplyModal() {
      this.replyShow = true;
    },
    async submitReply() {
      await this.fetchTweetAndReplies();
      this.replyShow = false;
    },
    async fetchTweetAndReplies() {
      this.tweetId = this.$route.params.tweetId;
      const response = await tweetApis.getTweetById(this.tweetId);
      const { data, replies } = response;

      this.tweet = data;
      this.replies = replies;
    },
    async addLike(id) {
      try {
        await usersApis.addTweetLike(id);
        this.tweet = {
          ...this.tweet,
          isLike: true,
          likeCount: this.tweet.likeCount + 1,
        };
      } catch (error) {
        const { response } = error;
        if (response) {
          if (response.data.message) {
            Toast.fire({
              icon: 'error',
              title: response.data.message,
            });
          }
        }
      }
    },
    async deleteLike(id) {
      try {
        await usersApis.deleteTweetLike(id);
        this.tweet = {
          ...this.tweet,
          isLike: false,
          likeCount: this.tweet.likeCount - 1
        };
      } catch (error) {
        const { response } = error;
        if (response) {
          Toast.fire({
            icon: 'error',
            title: response.data.message,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 1140px;
  max-height: 100vh;
}
.tweet-replies {
  height: 100vh;
  display: grid;
  grid-template-columns: 178px auto 273px;
  &__container {
    display: grid;
    grid-template-columns: 1px 1fr 1px;
    padding: 0px 24px 0 20px;

    &__line-left,
    &__line-right {
      width: 1px;
      height: 100%;
      background-color: $line-gray;
    }
  }
  .content {
    &__wrapper {
      &__title {
        height: 72px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $line-gray;
        padding-left: 28px;
      }
      &__tweet {
        margin: 16px 21px 8px 16px;
        border-bottom: 1px solid $line-gray;
      }
      &__reply-like-info {
        height: 60px;
        display: flex;
        align-items: center;
        padding: 16px 16.13px;
        border-bottom: 1px solid $line-gray;
      }
      &__reply-like-icons {
        height: 68px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid $line-gray;
        padding-left: 19.49px;
      }
    }
    &__title {
      line-height: 72px;
    }
    &__icon-back {
      width: 17px;
      height: 14px;
      display: inline-block;
      margin-right: 19px;
    }
    &__reply-nums {
      margin-right: 4px;
      @include font-reset;
      // font-family: "Montserrat", sans-serif;
      font-weight: 700;
      font-size: 19px;
    }
    &__reply-text {
      margin-right: 24px;
      font-weight: 500;
      font-size: 19px;
      color: $secondary-gray;
    }
    &__reply-icon {
      height: 24.69px;
      width: 24.69px;
      margin-right: 133.13px;
    }
    &__like-nums {
      margin-right: 4px;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      font-size: 19px;
    }
    &__like-text {
      font-weight: 500;
      font-size: 19px;
      color: $secondary-gray;
    }
    &__like-icon {
      height: 23.64px;
      width: 25.12px;
    }
  }
}
</style>