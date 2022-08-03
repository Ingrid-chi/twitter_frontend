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
    redirect: "/signin",
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
    path: "/user1",
    name: "user",
    component: () => import("../views/CurrentUser.vue"),
  },
  //個人所有推文
  // {
  //   path: '/:account/tweets',
  //   name: 'tweets',
  //   component: () => import('../views/Tweets.vue')
  // },
  //每一則tweet
  // {
  //   path: '/:account/tweets/:id',
  //   name: 'tweet',
  //   component: () => import('../views/Tweet.vue')
  // },
  //個人所有回覆
  // {
  //   path: '/:account/replies',
  //   name: 'replies',
  //   component: () => import('../views/Replies.vue')
  // },
  //個人所有Likes
  // {
  //   path: '/:account/likes',
  //   name: 'likes',
  //   component: () => import('../views/Likes.vue')
  // },
  //個人所有Followers
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
    path: "/user1/setting",
    name: "setting",
    component: () => import("../views/Setting.vue"),
  },
  // {
  //   path: '/admin',
  //   exact: true,
  //   redirect: '/admin/tweets'
  // },
  // 後臺登入
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
