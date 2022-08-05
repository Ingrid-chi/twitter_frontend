import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tweets: [],
  },
  getters: {
  },
  mutations: {
    createTweet(state, data) {
      state.tweets.unshift(data);
    },
    setTweets(state, data) {
      state.tweets = data;
    }
  },
  actions: {
  },
  modules: {
  }
})
