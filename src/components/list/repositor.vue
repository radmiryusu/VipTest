<template>
  <li class="list-group-item">
    <div class="item-top">
      <div class="item-info">
        <div class="item-info-top">
          <a class="item-name" :href="HtmlUrl">
            {{ name }}
          </a>
          <p class="item-language">({{ language }})</p>
        </div>
        <div class="item-info-bottom">
          <p class="item-date">
            {{ dateCreate(date) }}
          </p>
        </div>
      </div>
      <div class="item-btn">
        <a class="item-copy btn btn-outline-primary" :href="CloneUrl">Копировать</a>
      </div>
    </div>
    <div class="item-bottom">
      <p class="item-description">
        {{ description }}
      </p>
    </div>
  </li>
</template>
<script>
export default {
  
  props: {
    RepList: Object,
  },
  computed: {
    name() {
      return this.RepList.name;
    },
    description() {
      return this.RepList.description;
    },
    language() {
      return this.RepList.language;
    },
    HtmlUrl() {
      return this.RepList.html_url;
    },
    CloneUrl() {
      return this.RepList.clone_url;
    },
    date() {
      return this.RepList.created_at;
    },
  },
  methods: {
    dateCreate(date) {
      const intl = Intl.DateTimeFormat("ru");
      const newDate = new Date(date);
      return intl.format(newDate);
    },
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
  &-btn{
      width: 150px;
      height: 40px;
  }
  &-copy{
      height: 100%;
      width: 100%;
      line-height: 30px;
      
  }
  &-description{
      text-align: left;
  }
}
</style>