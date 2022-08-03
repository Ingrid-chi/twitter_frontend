import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem("token");

export default {
  // 帶入需要的參數
  getTweets() {
    // 這裡 return 的會是一個 Promise
    return apiHelper.get('/api/tweets', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
