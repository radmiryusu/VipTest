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
        .then((respons) => {
          commit("ListProfile", respons.data);
        });
    },
    //получение репозиториев пользователя
    dataReposit({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/repos`)
        .then((respons) => {
          commit("ListReposit", respons.data);
        });
    },
    //получение списка подписок
    dataSubscribers({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/following`)
        .then((data) => {
          commit("ListSubscribers", data);
        });
    },
    //получение списка теор. команды
    dataPersons({ commit }) {
      axios.get("https://api.github.com/users?since=50000000").then((data) => {
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
    AllRepositLang(state, data) {
      state.listLang = data;
    },
  },
  getters: {
    Profile(state) {
      return state.profile;
    },
    Reposit(state) {
      return state.listReposit;
    },
  },
});
