<template>
  <div class="card">
    <div class="card-img-top">
      <img class="card-image" :src="Avatar" alt="" />
    </div>
    <div class="card-body">
      <div class="card-title">
        <a class="card-title-link" :href="Url">{{ Login }}</a>
      </div>
      <div class="card-footer">
        <p class="card-footer-text">
          <span>Дата создания:</span>
          {{ dateCreate(this.date) }}
        </p>
      </div>
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
    Avatar() {
      return this.avatar;
    },
    Url() {
      return this.url;
    },
    Login() {
      return this.login;
    },
  },
  methods: {
    dateCreate(date) {
      if (date) {
        const intl = Intl.DateTimeFormat("ru");
        const newDate = new Date(date);
        return intl.format(newDate);
      }
      return "";
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