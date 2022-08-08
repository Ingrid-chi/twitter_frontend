import Vue from "vue";
import VueRouter from "vue-router";
import NotFound from "../views/NotFound.vue";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "root",
    component: Home,
  },
  {
    path: "/signin",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/signup",
    name: "sign-up",
    component: () => import("../views/SignUp.vue"),
  },
  //主畫面
  {
    path: "/home",
    name: "home",
    component: Home,
  },
  //個人及他人資料
  {
    path: "/:userId",
    name: "user",
    component: () => import("../views/CurrentUser.vue"),
  },
  {
    path: '/tweets/:tweetId',
    name: 'tweet',
    component: () => import('../views/TweetReplies.vue')
  },
  {
    path: "/:account/followers",
    name: "followers",
    component: () => import("../views/CurrentUserFollowPanel.vue"),
  },
  //個人所有Followings
  {
    path: "/:account/followings",
    name: "followings",
    component: () => import("../views/CurrentUserFollowPanel.vue"),
  },
  //個人設定
  {
    path: "/:userId/setting",
    name: "setting",
    component: () => import("../views/Setting.vue"),
  },
  {
    path: "/admin/signin",
    name: "admin-signin",
    component: () => import("../views/admin/AdminSignIn.vue"),
  },
  //後臺管理tweets們
  {
    path: "/admin/tweets",
    name: "admin-tweets",
    component: () => import("../views/admin/AdminTweets.vue"),
  },
  //後臺管理使用者們
  {
    path: "/admin/users",
    name: "admin-users",
    component: () => import("../views/admin/AdminUsers.vue"),
  },
  {
    path: "*",
    name: "not-found",
    component: NotFound,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
