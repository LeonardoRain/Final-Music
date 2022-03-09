import { createRouter, createWebHashHistory } from "vue-router";
const Recommend = () =>
  import("@/views/recommend.vue" /* webpackChunkName: "recommend" */);
const Singer = () =>
  import("@/views/singer.vue" /* webpackChunkName: "singer" */);
const TopList = () =>
  import("@/views/top-list.vue" /* webpackChunkName: "topList" */);
const Search = () =>
  import("@/views/search.vue" /* webpackChunkName: "search" */);
const SingerDetail = () =>
  import("@/views/singer-detail.vue" /* webpackChunkName: "singerDetail" */);
const Album = () => import("@/views/album.vue" /* webpackChunkName: "album" */);
const TopDetail = () =>
  import("@/views/top-detail.vue" /* webpackChunkName: "topDetail" */);
const UserCenter = () =>
  import("@/views/user-center.vue" /* webpackChunkName: "userCenter" */);

const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        component: Album,
      },
    ],
  },
  {
    path: "/singer",
    component: Singer,
    children: [
      {
        path: ":id",
        component: SingerDetail,
      },
    ],
  },
  {
    path: "/top-list",
    component: TopList,
    children: [
      {
        path: ":id",
        component: TopDetail,
      },
    ],
  },
  {
    path: "/search",
    component: Search,
  },
  {
    path: "/user",
    components: {
      user: UserCenter,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
