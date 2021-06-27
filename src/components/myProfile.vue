<template>
  <div class="content">
    <div class="card">
      <div class="card-img-top">
        <img class="card-image" :src="this.Profile.avatar_url" alt="" />
      </div>
      <div class="card-body">
        <div class="card-title">
          <a class="card-title-link" :href="linkGitHub">{{
            this.Profile.login
          }}</a>
        </div>
        <div class="card-footer">
          <p class="card-footer-text">
            {{ dateCreate(this.Profile.created_at) }}
          </p>
        </div>
      </div>
    </div>
    <div class="content_sub">
      <div class="content_sub-heading">
        <h2>Фоловеры</h2>
      </div>
      <div class="content_sub-list">
        <table class="table">
          <thead class="table_heading-sub">
            <tr class="table_heading">
              <th scope="col">Иконка</th>
              <th scope="col">Имя пользоватея</th>
            </tr>
          </thead>
          <tbody class="table_body-sub">
            <tr v-for="item in Subscribers" :key="item.id">
              <td><img :src="item.avatar_url" alt="" /></td>
              <td>
                <a :href="item.html_url"> {{ item.name }} </a>
              </td>
            </tr>
          </tbody>
          <Error v-if="Subscribers.length === 0"></Error>
        </table>
      </div>
    </div>
    <div class="content_repos">
      <div class="content_repos-heading">
        <h2>Репозитории пользователя</h2>
      </div>
      <div class="content_repos-list">
        <table class="table table-striped">
          <thead class="table_heading-rep">
            <tr class="table_heading">
              <th scope="col">Название</th>
              <th scope="col">Описание</th>
              <th scope="col">Язык</th>
              <th scope="col">Ссылка на копию</th>
              <th scope="col">Дата создания</th>
            </tr>
          </thead>
          <tbody class="table_body-rep">
            <tr
              class="content_repos-list-item"
              v-for="item in Reposit"
              :key="item.id"
            >
              <td>
                <a :href="item.html_url">
                  {{ item.name }}
                </a>
              </td>
              <td>
                <p :title="item.description">{{ item.description }}</p>
              </td>
              <td>
                <p :title="item.lang">{{ item.lang }}</p>
              </td>
              <td>
                <p class="table_body-url" :title="item.clone_url">
                  {{ item.clone_url }}
                </p>
              </td>
              <td>
                <p>{{ dateCreate(item.created_at) }}</p>
              </td>
            </tr>
          </tbody>
          <Error v-if="Reposit.length === 0"></Error>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import Error from "@/components/DataError.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    Error,
  },
  mounted() {
    this.dataProfile();
    this.dataReposit();
    this.dataSubscribers();
  },

  computed: {
    ...mapGetters(["Profile", "Reposit", "Subscribers"]),
    linkGitHub() {
      return `https://github.com/${this.Profile.login}`;
    },
  },
  methods: {
    ...mapActions(["dataProfile", "dataReposit", "dataSubscribers"]),
    dateCreate(date) {
      const regex = /(\d{4})-(\d{2})-(\d{2})(T\d{2}:\d{2}:\d{2}Z)/gm;
      return date.replace(regex, `$3:$2:$1`);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/color.scss";
.content {
  width: 90%;
  background: $backgroundBlock;
  padding: 20px;
  border-radius: 5px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &_repos {
    width: 100%;
    background: $backgroundWhite;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    &-list {
      overflow-x: scroll;
      width: 100%;
      background: $backgroundBlock;
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
    background: $backgroundWhite;
    padding: 10px;
    border-radius: 5px;
    margin-left: 10px;
    width: calc(70% - 10px);
    &-heading {
      height: 40px;
    }
    &-list {
      overflow-x: scroll;
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
th {
  color: $colorWhite;
}
.card {
  width: 30%;
  padding: 10px;
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
    background: $backgroundWhite;
    border: none;
    &-text {
      font-weight: 800;
    }
  }
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
