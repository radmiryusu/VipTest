<template>
  <v-card>
    <v-list-item v-for="(item, index) of reposit" :key="index">
      <v-list-item-content>
        <v-list-item-title> </v-list-item-title>
        <v-list-item-subtitle> </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    data: Array,
  },
  computed: {
    reposit() {
      return this.data;
    },
    dateCreate() {
      return this.date ? Intl.DateTimeFormat("ru").format(new Date()) : "";
    },
  },
  mounted() {
    console.log(this.data);
  },
};
</script>
 <style lang="scss" scoped>
.item {
  &-top {
    display: flex;
    justify-content: space-between;
  }
  &-info {
    &-top {
      display: flex;
    }
  }
  &-name {
    text-decoration: none;
  }
  &-language {
    margin-left: 5px;
    font-size: 14px;
    margin-bottom: 0;
  }
  &-date {
    text-align: left;
    color: #bababa;
  }
  &-btn {
    width: 150px;
    height: 40px;
  }
  &-copy {
    height: 100%;
    width: 100%;
    line-height: 30px;
  }
  &-description {
    text-align: left;
  }
}
</style>