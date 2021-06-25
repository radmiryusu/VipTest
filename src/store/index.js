import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Vuex);

Vue.use(VueAxios, axios);
export default new Vuex.Store({
  state: {
    person: "ezmobius",
    profile: {}, //профиль пользователя
    listReposit: [], //список репозитория
    listSub: [], //список подписок
    listTeam: [], //список пользователей
  },
  actions: {
    //получение профился пользователя
    dataProfile({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}`)
        .then((resolve) => {
          commit("ListProfile", resolve.data);
        });
    },
    //получение репозиториев пользователя
    dataReposit({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/repos`)
        .then((resolve) => {
          let data = [];
          resolve.data.forEach(async (url) => {
            await axios.get(url.languages_url).then((res) => {
              url.lang = Object.keys(res.data);
              data.push(url);
            });
          });
          return data;
        })
        .then((data) => {
          commit("ListReposit", data);
        });
    },
    //получение списка подписок
    dataSubscribers({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/following_url`)
        .then((resolve) => {
          commit("ListSubscribers", resolve.data);
        });
    },
    //получение списка теор. команды
    dataPersons({ commit }) {
      axios
        .get("https://api.github.com/users?since=50000000")
        .then((resolve) => {
          commit("AllPersons", resolve.data);
        });
    },
    newPersonsList({ commit }, data) {
      commit("AllPersons", data);
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
    Reposit(state) {
      return state.listReposit;
    },
    Subscribers(state) {
      return state.listSub;
    },
    AllPerson(state) {
      return state.listTeam;
    },
  },
});
