import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "https://thawing-hollows-28251.herokuapp.com/api";
// const baseURL = "http://localhost:3000/api";

export const apiHelper = axios.create({
  baseURL,
});


export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})

apiHelper.interceptors.response.use(
  response => {
    return response.data
  },
  errResponse => Promise.reject(errResponse)
)

// export const catchHandler = promise => {
//   return promise.catch(errResponse => ({
//     statusCode: errResponse?.code ?? 500,
//     ...errResponse?.response?.data ?? {},
//   })
//   )
// }