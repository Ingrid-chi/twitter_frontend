import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tweets: [],
    currentUser: {
      account: "",
      avatar: "",
      cover: "",
      createdAt: "",
      email: "",
      id: -1,
      introduction: "",
      name: "",
      role: "",
      updatedAt: "",
    },
    followUsers: "",
    isAuthenticated: false,
  },
  getters: {},

  // 改資料的方法
  mutations: {
    createTweet(state, data) {
      state.tweets.unshift(data);
    },
    setTweets(state, data) {
      state.tweets = data;
    },

    setCurrentUser(state, currentUser) {
      state.currentUser = {
        // 複製一份進來
        ...state.currentUser,
        // 從外部傳進來的(通常透過 API 取得)，修改上方 state.currentUser 的資料
        ...currentUser,
      };
    },

    setFollowUsers(state, followUsers) {
      state.followUsers = {
        ...state.followUsers,
        ...followUsers,
      };
    },
  },

  actions: {},
  modules: {},
});
