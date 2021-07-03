import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import FetchMethods from "../modul/data.js";
Vue.use(Vuex);

Vue.use(VueAxios, axios);
export default new Vuex.Store({
  state: {
    person: "ezmobius", //имя репозитория
    profile: {}, //профиль пользователя
    listReposit: [], //список репозитория
    listSub: [], //список подписок
    listTeam: [], //список пользователей
  },
  actions: {
    //получение профился пользователя
    dataProfile({ commit, state }) {
      const url = `https://api.github.com/users/${state.person}`;
      FetchMethods(url)
        .then((res) => {
          console.log(res);
          commit("ListProfile", res);
          return res;
        })
        .then(({ repos_url, following_url }) => {
          Promise.allSettled([
            FetchMethods(repos_url),
            FetchMethods(following_url.split(/{\/[a-z]*\D[a-z]*}/)[0]),
          ]).then((res) => {
            commit("ListReposit", res[0].value);
            commit("ListSubscribers", res[1].value);
          });
        });
    },
    //получение списка теор. команды
    dataPersons({ commit }, data = []) {
      if (data.length !== 0) {
        commit("AllPersons", data);
      } else {
        axios
          .get("https://api.github.com/users?since=50000000", {
            Authorization: "token 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",
          })
          .then((resolve) => {
            commit("AllPersons", resolve.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
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
