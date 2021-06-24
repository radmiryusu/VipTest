import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);
export default new Vuex.Store({
  state: {
    person: "radmiryusu",
    profile: {}, //профиль пользователя
    listReposit: [], //список репозитория
    listSub: [], //список подписок
    listTeam: [], //список пользователей
  },
  actions: {
    dataProfile({ commit, state }) {
      axios
        .get("https://api.github.com/users/" + state.person)
        .then((res) => {
          commit("ListProfile", res.data);
      });
    },
    dataReposit({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/repos_url`)
        .then((data) => {
          commit("ListReposit", data);
        });
    },
    dataSubscribers({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/following_url`)
        .then((data) => {
          commit("ListSubscribers", data);
        });
    },
    dataPersons({ commit }) {
      axios
        .get("https://api.github.com/users?since=50000000")
        .then((data) => {
          commit("ListSubscribers", data);
        });
    },
  },
  mutations: {
    ListProfile(state, data) {
      state.profile = data;
    },
    ListReposit(state, data) {
      state.listReposit = data;
    },
    ListSubscribers(state, data) {
      state.listSub = data;
    },
    AllPersons(state, data) {
      state.listTeam = data;
    },
  },
  getters: {
    Profile(state) {
      return state.profile;
    },
  },
});
