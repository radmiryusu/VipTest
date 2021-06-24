<template>
  <div class="content">
    <div class="content_post">
      <div class="content_post_icon">
        <img :src="this.Profile.avatar_url" alt="" />
      </div>
      <div class="content_post_info">
        <div class="content_post_info-link">
          <a :href="linkGitHub">{{ this.Profile.login }}</a>
        </div>
        <div class="content_post_info-date">
          <p>{{ dateCreate(this.Profile.created_at) }}</p>
        </div>
      </div>
    </div>
    <div class="content_repos">
      <div class="content_repos-heading">
        <h2>Репозитории пользователя</h2>
      </div>
      <ul>
        <li v-for="(item, i) in this.Reposit" :key="item.id">
          <div class="content_repos-name">
            <a :href="item.html_url">
              {{ item.name }}
            </a>
          </div>
          <div class="content_repos-descript">
            <p>{{ item.description }}</p>
          </div>
          <div class="content_repos-lang">
            <p>{{ this.listLang[i] }}</p>
          </div>
          <div class="content_repos-date">
            <p>{{ dateCreate(item.created_at) }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="content_sub">
      <ul>
        <li>
          <div class="content_sub-img">
            <img src="" alt="" />
            <div class="content_sub-link">
              <a href="#"> {{}} </a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      listLang: [],
    };
  },
  mounted() {
    this.dataProfile();
    this.dataReposit();
    this.Reposit.map((url) => {
      this.RepositLang(url.languages_url);
    });
  },
  updated() {
    console.log(this.Langage);
  },
  computed: {
    ...mapGetters(["Profile", "Reposit", "Langage"]),
    linkGitHub() {
      return `https://github.com/${this.Profile.login}`;
    },
  },
  methods: {
    ...mapActions(["dataProfile", "dataReposit"]),
    dateCreate(date) {
      const regex = /(\d{4})-(\d{2})-(\d{2})(T\d{2}:\d{2}:\d{2}Z)/gm;
      return date.replace(regex, `$3:$2:$1`);
    },
    RepositLang(url) {
      this.axios.get(url).then((response) => {
        console.log(response.data);
        this.listLang.push(response.data != {} ? response.data : "Неизвестно");
      });
    },
    //
  },
};
</script>
<style lang="scss"></style>
