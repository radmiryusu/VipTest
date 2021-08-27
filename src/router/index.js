import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "../view/Profile.vue";
import Team from "../view/Team.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Profile",
    component: Profile,
  },
  {
    path: "/team",
    name: "Team",
    component: Team,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
