<template>
  <v-card>
    <v-list-item v-for="(item, index) of subscribers" :key="index">
      <v-list-item-content>
        <v-list-item-title>{{ item }} </v-list-item-title>
        <v-list-item-subtitle>{{ item }} </v-list-item-subtitle>
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
    subscribers() {
      return this.data;
    },
  },
  mounted() {
    console.log(this.subscribers);
  },
};
</script>
<style lang="scss" scoped>
</style>
