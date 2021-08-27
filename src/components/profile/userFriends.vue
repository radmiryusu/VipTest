<template>
  <ul class="list-group">
    <li v-for="(item,index) in data" :key="index" class="list-group-item">
      <div class="item-top">
        <img class="item-top-img" :src="item.avatar" alt="" />
      </div>
      <div class="item-bottom">
        <p class="item-bottom-name">{{ item.login }}</p>
        <a class="item-bottom-link" :href="item.url"> {{ item.url }} </a>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  props: {
    data: Array,
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