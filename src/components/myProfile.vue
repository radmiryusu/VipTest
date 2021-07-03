<template>
  <div class="content">
    <ProfileCard
      :avatar="this.Profile.avatar_url"
      :url="this.Profile.html_url"
      :login="this.Profile.login"
      :date="this.Profile.created_at"
    ></ProfileCard>
    <div class="content_sub">
      <div class="content_sub-heading">
        <h2>Фоловеры</h2>
      </div>
      <div class="content_sub-list">
        <ul class="list-group">
          <SublList
            v-for="item in Subscribers"
            :key="item.id"
            :person="item"
          ></SublList>
        </ul>
        <Error v-if="Subscribers.length === 0"></Error>
      </div>
    </div>
    <div class="content_repos">
      <div class="content_repos-heading">
        <h2>Репозитории пользователя</h2>
      </div>
      <div class="content_repos-list">
        <ul class="list-group">
          <RepList
            v-for="item in Reposit"
            :key="item.id"
            :RepList="item"
          ></RepList>
        </ul>

        <Error v-if="Reposit.length === 0"></Error>
      </div>
    </div>
  </div>
</template>
<script>
import Error from "@/components/DataError.vue";
import SublList from "@/components/list/subscribers.vue";
import RepList from "@/components/list/repositor.vue";
import ProfileCard from "@/components/list/ProfileCard.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Error,
    SublList,
    RepList,
    ProfileCard,
  },
  created() {
    this.dataProfile();
  },

  computed: {
    ...mapGetters(["Profile", "Reposit", "Subscribers"]),
  },
  methods: {
    ...mapActions(["dataProfile"]),
    
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/color.scss";
.content {
  width: 60%;
  padding: 20px;
  border-radius: 5px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &_repos {
    width: 100%;
    border: 1px solid rgb(179, 179, 179);
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    &-list {
      position: relative;
      overflow-x: scroll;
      overflow-y: hidden;
      width: 100%;
      background: rgb(179, 179, 179);
      padding: 0;
      height: 450px;
      &-item {
        border-bottom: 1px solid $borderItem;
        transition: 0.5s;

        &:hover {
          background: $backgroundItemHover;
        }
      }
    }
    &-description,
    &-lang {
      justify-content: center;
    }
    &-date {
      justify-content: flex-end;
    }
  }
  &_sub {
    border: 1px solid rgb(179, 179, 179);
    padding: 10px;
    border-radius: 5px;
    margin-left: 10px;
    width: calc(70% - 10px);
    &-heading {
      height: 40px;
    }
    &-list {
      position: relative;
      padding: 0;
      background: $backgroundBlock;

      height: calc(100% - 40px);
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      display: flex;
      padding: 3px 10px;
      width: 50%;
      transition: 0.5s;
      &:hover {
        background: $backgroundItemHover;
      }
    }
    &-img {
      height: 60px;
      width: 60px;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
      }
    }
    &-link {
      margin-left: 10px;
      display: flex;
      align-items: center;
      a {
        color: $colorLink;
        font-size: 18px;
      }
    }
  }
}
.table {
  position: relative;
  width: 100%;
  min-width: 500px;
  &_sub {
    height: 100%;
  }
  &_heading {
    background: $backgroundTable;

    &-rep,
    &-sub {
      display: table;
      width: 100%;
      table-layout: fixed;
    }
  }
  &_body {
    &-sub {
      width: 100%;
      display: block;
      min-height: 350px;
      max-height: 500px;
      overflow-y: scroll;
      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
        p {
          white-space: nowrap; /* Отменяем перенос текста */
          overflow: hidden; /* Обрезаем содержимое */
          text-overflow: ellipsis; /* Многоточие */
        }
      }
    }
    &-rep {
      display: block;
      height: 400px;
      overflow-y: scroll;
      width: 100%;
      tr {
        display: table;
        width: 100%;
        table-layout: fixed;
      }
    }
    &-url {
      overflow: hidden; /* Обрезаем содержимое */
      text-overflow: ellipsis; /* Многоточие */
      white-space: nowrap; /* Отменяем перенос текста */
    }
  }
}

.list-group {
  width: 100%;
  max-height: 500px;
  overflow-y: auto;
}
@media (min-width: 320px) and (max-width: 479px) {
  .content {
    width: 100%;
    &_sub {
      margin-top: 10px;
      width: 100%;
      margin-left: 0;
    }
  }
  .card {
    width: 100%;
    &-img {
      &-top {
        padding: 5px;
      }
    }
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .content {
    width: 100%;
    &_sub {
      margin-top: 10px;
      width: 100%;
      margin-left: 0;
    }
  }
  .card {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 10px;
    &-img {
      &-top {
        width: 40%;
        img {
          width: 100%;
        }
      }
    }
    &-body {
      width: 60%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
}
</style>
