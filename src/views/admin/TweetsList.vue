<template>
  <div class="list-wrapper">
    <NavBar isAdmin="true" />
    <div class="content">
      <div class="header">
        <h4 class="header__title">推文清單</h4>
      </div>
      <div class="list">
        <TweetsListCard
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
import TweetsListCard from '../../components/admin/TweetsListCard';
import NavBar from '../../components/NavBar';
import adminAPI from '../../apis/admin';
import { Toast } from '../../utils/helpers';

// const dummyData = {
//   tweets: [
//     {
//       id: 51,
//       description:
//         'Repudiandae dolor est quiRepudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.Repudiandae dolor est qui.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 52,
//       description: 'Odit ipsam qui et blanditiis eos.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 53,
//       description: 'Sint dolore aut sed.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 54,
//       description: 'Est saepe eligendi suscipit non est.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 55,
//       description: 'Praesentium eius dolorem molestiae.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 56,
//       description: 'Libero sed tenetur incidunt enim debitis reprehenderit ea.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 57,
//       description: 'Et beatae illum debitis quia.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 58,
//       description: 'Tempora nostrum eligendi magni reiciendis.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 59,
//       description: 'Id non est.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 60,
//       description:
//         'Cumque sint magnam deleniti molestias aperiam tempora perferendis.',
//       userId: 2,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 2,
//         account: 'user1',
//         name: 'user1',
//         email: 'user1@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=17.7693811553588',
//         introduction: 'In et doloremque recusandae rerum ut sit.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=27.651604212287985',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//     {
//       id: 61,
//       description: 'Ea mollitia omnis quia quo rerum id.',
//       userId: 3,
//       createdAt: '2022-07-29T19:12:23.000Z',
//       updatedAt: '2022-07-29T19:12:23.000Z',
//       User: {
//         id: 3,
//         account: 'user2',
//         name: 'user2',
//         email: 'user2@example.com',
//         avatar: 'https://loremflickr.com/320/240/cat/?lock=55.192147520956894',
//         introduction: 'Modi sit id.',
//         cover:
//           'https://loremflickr.com/320/240/landscape/?lock=68.8466487329233',
//         role: 'user',
//         createdAt: '2022-07-28T17:18:40.000Z',
//         updatedAt: '2022-07-28T17:18:40.000Z',
//       },
//     },
//   ],
// };

export default {
  name: 'TweetsList',
  components: {
    TweetsListCard,
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
        const { data } = response.data;

        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        this.tweets = data.tweets;
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
  width: 100%;
  max-height: 100vh;
  padding: 0 130px;

  display: grid;
  grid-template-columns: max-content 1fr;
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
  margin-left: 24px;
}
</style>
