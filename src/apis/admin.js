import { apiHelper } from "../utils/helpers";
const getToken = () => localStorage.getItem("admin-token");

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
  users: {
    get() {
      return apiHelper.get("/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
    },
  },
};
