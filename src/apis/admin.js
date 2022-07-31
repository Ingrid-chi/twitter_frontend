import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem('admin-token');
// const getToken = () =>
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWNjb3VudCI6InJvb3QiLCJuYW1lIjoicm9vdCIsImVtYWlsIjoicm9vdEBleGFtcGxlLmNvbSIsImF2YXRhciI6bnVsbCwiaW50cm9kdWN0aW9uIjpudWxsLCJjb3ZlciI6bnVsbCwicm9sZSI6ImFkbWluIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0zMFQyMDoxMTo1OS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0zMFQyMDoxMTo1OS4wMDBaIiwiaWF0IjoxNjU5MjExOTYxLCJleHAiOjE2NjE4MDM5NjF9.Glk0FdusPIwL1Q01LEcVLNJbOi_IxNHj4X7YlkEIb94";

export default {
  admin: {
    signIn({ account, password }) {
      return apiHelper.post("/admin/users", {
        account,
        password,
      });
    },
  },
  tweet: {
    get() {
      return apiHelper.get("/admin/tweets", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
    delete(id) {
      return apiHelper.delete(`/admin/tweets/${id}`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
  },
};
