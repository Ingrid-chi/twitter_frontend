<template>
  <div class="list-wrapper">
    <NavBar :isAdmin="true" />
    <div class="content">
      <div class="header">
        <h4 class="header__title">推文清單</h4>
      </div>
      <div class="list">
        <AdminTweetsListCard
          v-for="tweet in tweets"
          :key="tweet.id"
          :tweet="tweet"
          @after-delete-tweet="afterDeleteTweet"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminTweetsListCard from '../../components/admin/AdminTweetsListCard';
import NavBar from '../../components/NavBar';
import adminAPI from '../../apis/admin';
import { Toast } from '../../utils/helpers';

export default {
  name: 'AdminTweets',
  components: {
    AdminTweetsListCard,
    NavBar,
  },
  data() {
    return {
      tweets: [],
    };
  },
  created() {
    this.fetchTweets();
    this.tweets = {
      ...this.tweets,
    };
  },
  methods: {
    async fetchTweets() {
      try {
        const response = await adminAPI.tweet.get();

        if (response.status !== 'success') {
          throw new Error(response.message);
        }

        this.tweets = response.tweets;
      } catch (error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得推文清單，請稍後再試',
        });
      }
    },
    afterDeleteTweet(payload) {
      const { id } = payload;
      this.tweets = this.tweets.filter(tweet => tweet.id !== id)
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
  // width: 100%;
  // max-height: 100vh;
  // padding: 0 130px;

  // display: grid;
  // grid-template-columns: max-content 1fr;
}

.header {
  width: 100%;
  background-color: $white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 24px 0 24px 24px;

  border-bottom: 1px solid $line-gray;
  border-right: 1px solid $line-gray;

  z-index: 3;

  &__title {
    color: $main-black;
  }
}

.content {
  max-height: 100vh;
  overflow: scroll;
  border-left: 1px solid $line-gray;
  // margin-left: 24px;
}
</style>
