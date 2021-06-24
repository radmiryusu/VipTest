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
          let data = [];
          respons.data.forEach((url) => {
            axios.get(url.languages_url).then((res) => {
              url.lang = Object.keys(res.data);
            }).then( data.push(url));
           ;
          });
          commit("ListReposit", respons.data);
          
          //данные правильно не отображаются
          /*   setTimeout(() => {
            commit("ListReposit", respons.data); крайнии вариант
          }, 2000); */
        })
       /*  .then((respons) => {
         
        }); */
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
    RepositLang({ commit }, url) {
      this.axios.get(url).then((response) => {
        commit("AllLang", [response.data, url]);
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
