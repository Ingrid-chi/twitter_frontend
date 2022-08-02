import { apiHelper } from './../utils/helpers'

export default {
  // 帶入需要的參數
  signIn({ account, password }) {
    // 這裡 return 的會是一個 Promise
    return apiHelper.post('/users/signin', {
      account,
      password
    })
  },
  signUp({ account, email, name, password, checkPassword }) {
    return apiHelper.post('/users', {
      account,
      email,
      name,
      password,
      checkPassword
      }
    )
  }
}