<template>
  <div class="card" style="width: 18rem">
    <img :src="avatarUrl" class="card-img-top" alt="img error" />
    <div class="card-body">
      <h5 class="card-title">Дата создания:</h5>
      <p class="card-text">{{ dateCreate }}</p>
      <a :href="urlAccount" class="btn btn-primary">{{ userName }}</a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    avatar: String,
    url: String,
    login: String,
    date: String,
  },
  computed: {
    avatarUrl() {
      return this.avatar;
    },
    urlAccount() {
      return this.url;
    },
    userName() {
      return this.login;
    },
    dateCreate() {
      return this.date
        ? Intl.DateTimeFormat("ru").format(new Date(this.date))
        : "";
    },
  },
};
</script>
<style lang="scss" scoped>
</style>