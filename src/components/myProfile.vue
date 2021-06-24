<template>
  <div class="content">
    <div class="content_post">
      <div class="content_post_icon">
        <img :src="this.profile.avatar_url" alt="" />
      </div>
      <div class="content_post_info">
        <div class="content_post_info-link">
          <a href="#">{{ this.profile }}</a>
        </div>
        <div class="content_post_info-date">
          <p>{{}}</p>
        </div>
      </div>
    </div>
    <div class="content_repos">
      <ul>
        <li>
          <div class="content_repos-name">
            <a href="#"></a>
          </div>
          <div class="content_repos-descript">
            <p>{{}}</p>
          </div>
          <div class="content_repos-lang">
            <p>{{}}</p>
          </div>
          <div class="content_repos-date">
            <p>{{}}</p>
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
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  mounted() {
 this.dataProfile();
 console.log(this.profile);   
  },
  computed: mapState(["profile"]),
  methods: {
    ...mapActions(["dataProfile"],),
  },
};
</script>
<style lang="scss"></style>
