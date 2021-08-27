import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(Vuex);

Vue.use(VueAxios, axios);
export default new Vuex.Store({
  state: {
    person: "radmiryusu", //имя репозитория
    profile: {}, //профиль пользователя
    listReposit: [], //список репозитория
    listSub: [], //список подписок
    listTeam: [], //список пользователей
  },
  actions: {
    //получение профился пользователя
    dataProfile({ commit, state }) {
      axios.get(`https://api.github.com/users/${state.person}`)
        .then((res) => {
          commit("ListProfile", res.data);
          return res.data;
        })
        .then(({ repos_url, following_url }) => {
          const link = Promise.allSettled([
            axios.get(repos_url),
            axios.get(following_url.split(/{\/[a-z]*\D[a-z]*}/)[0]),
          ]);

          link.then((data) => {
            const [repost, subscribe] = data
            commit("ListReposit", repost.value.data);
            commit("ListSubscribers", subscribe.value.data);
          });
        });
    },
    //получение списка теор. команды
    dataPersons({ commit }, data = []) {
      if (data.length !== 0) {
        commit("AllPersons", data);
      } else {
        axios.get("https://api.github.com/users?since=50000000")
          .then((resolve) => {
            commit("AllPersons", resolve);
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
