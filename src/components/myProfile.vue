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
      <ul class="content_repos-heading-list">
        <li v-for="(item) in this.Reposit" :key="item.id">
          <div class="content_repos-name">
            <a :href="item.html_url">
              {{ item.name }}
            </a>
          </div>
          <div class="content_repos-descript">
            <p>{{ item.description }}</p>
          </div>
          <div class="content_repos-lang">
            <p>{{ item.lang }}</p>
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
    return {};
  },
  mounted() {
    this.dataProfile();
    this.dataReposit();
  },
  computed: {
    ...mapGetters(["Profile", "Reposit"]),
    linkGitHub() {
      return `https://github.com/${this.Profile.login}`;
    },
  },
  methods: {
    ...mapActions(["dataProfile", "dataReposit", "RepositLang"]),
    dateCreate(date) {
      const regex = /(\d{4})-(\d{2})-(\d{2})(T\d{2}:\d{2}:\d{2}Z)/gm;
      return date.replace(regex, `$3:$2:$1`);
    },
  },
};
</script>
<style lang="scss">
.content_repos-heading-list {
  height: 300px;
  overflow-y: scroll;
}
</style>
