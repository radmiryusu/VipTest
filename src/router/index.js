import Vue from "vue";
import VueRouter from "vue-router";
import Profile from "../components/myProfile.vue";
import Team from "../components/myTeam.vue";

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
