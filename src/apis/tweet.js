import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem("token");

export default {
  // 帶入需要的參數
  getTweets() {
    // 這裡 return 的會是一個 Promise
    return apiHelper.get('/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  createTweet(description) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/tweets', {
      description,
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getTweetById(tweetId) {
    return apiHelper.get(`/tweets/${tweetId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  replyTweet(tweetId, comment) {
    return apiHelper.post(`/tweets/${tweetId}/replies`, {
      comment
    }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}
