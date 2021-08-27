<template>
  <div class="card" style="width: 18rem">
    <img :src="avatarUrl" class="card-img-top" alt="img error" />
    <div class="card-body">
      <h5 class="card-title">Дата создания:</h5>
      <p class="card-text">{{ dateCreate(date) }}</p>
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
      return this.date ? Intl.DateTimeFormat("ru").format(new Date(this.date)) : "";
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/scss/color.scss";
.card {
  width: 30%;
  padding: 10px;
  border: 1px solid rgb(179, 179, 179);
  &-image {
    width: 100%;
    border-radius: 5px;
  }
  &-title {
    margin: 10px 0;
    &-link {
      font-size: 1.6rem;
      color: $colorLink;
      transition: 0.5s;
      text-decoration: none;
      &:hover {
        color: $colorCardHover;
      }
    }
  }
  &-footer {
    background: #fff;
    border: none;
    &-text {
      font-weight: 800;
    }
  }
}
</style>