import { apiHelper } from "./../utils/helpers";
const getToken = () => localStorage.getItem("token");

export default {
  // 帶入需要的參數
  getUser(id) {
    console.log('222', id)
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

  // like 系列
  // post 通常會給 3 個參數
  addTweetLike(id) {
    return apiHelper.post(
      `/tweets/${id}/like`,
      {
        id,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },

  deleteTweetLike(id) {
    return apiHelper.post(
      `/tweets/${id}/unlike`,
      {
        id,
      },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },

  // follow 系列
  getUserFollowings(id) {
    return apiHelper.get(`/users/${id}/followings`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  addFollowing({ id }) {
    return apiHelper.post(
      `/followships`,
      { id },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
  },

  deleteFollowing(id) {
    return apiHelper.delete(`/followships/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getUserFollowers(id) {
    return apiHelper.get(`/users/${id}/followers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  // popular 系列
  getPopularUsers() {
    return apiHelper.get(`/users/recommendUsers`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  getCurrentUser() {
    return apiHelper.get(`/users/currentUser`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
  },

  editUserSettings({ id, formData }) {
    return apiHelper.put(`/users/${id}/setting`,
      formData,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
  },
};
