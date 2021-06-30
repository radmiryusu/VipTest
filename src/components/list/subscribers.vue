<template>
  <li class="list-group-item d-flex align-items-center">
    <div class="item-start">
      <img class="item-start-img" :src="logo" alt="" />
    </div>
    <div class="item-end">
      <a class="item-end-link" :href="link"> {{ name }} </a>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    person: Object,
  },
  computed: {
    logo() {
      return this.person.avatar_url;
    },
    name() {
      return this.person.login;
    },
    link() {
      return this.person.html_url;
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  &-start {
      width: 50px;
      height: 50px;
    &-img {
      border-radius: 4px;
      width: 100%;
      height: 100%;
    }
  }
  &-end{
      margin-left: 5px;
      &-link{
          text-decoration: none;
      }
  }
}
</style>
