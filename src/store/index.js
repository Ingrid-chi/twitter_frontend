import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [
      {
        "id": 2,
        "description": "Quasi voluptatem temporibus ut at sint minima est non.",
        "userId": 2,
        "createdAt": "2022-07-31T11:13:44.000Z",
        "likeCount": 0,
        "replyCount": 3,
        "User": {
          "name": "user1",
          "account": "user1",
          "avatar": "https://loremflickr.com/320/240/cat/?lock=93.54589374664013"
        }
      }
    ],
  },
  getters: {
  },
  mutations: {
    createTweet(state, data) {
      state.tweets.unshift(data);
    }
  },
  actions: {
  },
  modules: {
  }
})
