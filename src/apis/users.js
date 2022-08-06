import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  // 帶入需要的參數
  getUser(id) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getUserTweets(id) {
    return apiHelper.get(`/users/${id}/tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getUserReplied(id) {
    return apiHelper.get(`/users/${id}/replied_tweets`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getUserLikes(id) {
    return apiHelper.get(`/users/${id}/likes`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  addTweetLike(id) {
    return apiHelper.post(`/tweets/${id}/like`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getCurrentUser() {
    return apiHelper.get(`/users/currentUser`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },
};
