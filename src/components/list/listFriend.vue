<template>
  <li class="list-group-item">
    <div class="item-top">
      <img class="item-top-img" :src="avatar" alt="" />
    </div>
    <div class="item-bottom">
      <p class="item-bottom-name">{{ login }}</p>
      <a class="item-bottom-link" :href="url"> {{ url }} </a>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    person: Object,
  },
  computed: {
    avatar() {
      return this.person.avatar_url;
    },
    login() {
      return this.person.login;
    },
    url() {
      return this.person.html_url;
    },
  },
};
</script>
<style lang="scss" scoped>
.item {
  padding: 5px;
  display: flex;
  align-items: center;
  transition: 0.5s;
  border-bottom: 1px solid #f1f1f1;
  &:hover {
    background: rgb(216, 216, 216);
  }
  &-top {
    width: 35px;
    height: 35px;
    &-img {
      width: 100%;
      height: 100%;
    }
  }
  &-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(100% - 45px);
    margin-left: 10px;
  }
}
</style>