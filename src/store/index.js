import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";

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
      axios
        .get(`https://api.github.com/users/${state.person}`, {
          Authorization: "token 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",
        })
        .then((resolve) => {
          this.dispatch("dataReposit");
          this.dispatch("dataSubscribers");
          commit("ListProfile", resolve.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //получение репозиториев пользователя
    dataReposit({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/repos`, {
          Authorization: "token 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",
        })
        .then((resolve) => {
          let data = [];
          resolve.data.forEach(async (url) => {
            await axios.get(url.languages_url).then((res) => {
              url["language"] = Object.keys(res.data).join(",");
              data.push(url);
            });
          });
          return data;
        })
        .then((data) => {
          commit("ListReposit", data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //получение списка подписок (выдает 0 по api, но в гите есть)
    dataSubscribers({ commit, state }) {
      axios
        .get(`https://api.github.com/users/${state.person}/following`, {
          Authorization: "token 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",
        })
        .then((resolve) => {
          commit("ListSubscribers", resolve.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //получение списка теор. команды
    dataPersons({ commit }) {
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
    },
    //запись нового массива(удаленного иди добавлен)
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
