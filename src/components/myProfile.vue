<template>
  <div class="content">
    <div class="card">
      <div class="card-img-top">
        <img class="card-img-top" :src="this.Profile.avatar_url" alt="" />
      </div>
      <div class="card-body">
        <div class="content_post_info-link">
          <a class="card-title" :href="linkGitHub">{{ this.Profile.login }}</a>
        </div>
        <div class="content_post_info-date">
          <p class="card-text">{{ dateCreate(this.Profile.created_at) }}</p>
        </div>
      </div>
    </div>
    <div class="content_sub">
      <div class="content_repos-heading">
        <h2>Фоловеры</h2>
      </div>
      <div class="content_repos-list">
        <table class="table">
          <tr class="table_heading">
            <th scope="col">Иконка</th>
            <th scope="col">Имя пользоватея</th>
          </tr>
          <tr v-for="item in Subscribers" :key="item.id">
            <td><img :src="item.avatar_url" alt="" /></td>
            <td>
              <a :href="item.html_url"> {{ item.name }} </a>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="content_repos">
      <div class="content_repos-heading">
        <h2>Репозитории пользователя</h2>
      </div>
      <div class="content_repos-list">
        <table class="table table-striped">
          <tr class="table_heading">
            <th scope="col">Название</th>
            <th scope="col">Описание</th>
            <th scope="col">Язык</th>
            <th scope="col">Ссылка на копию</th>
            <th scope="col">Дата создания</th>
          </tr>
          <tr
            class="content_repos-list-item"
            v-for="item in this.Reposit"
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
              <p :title="LangSplit(item.lang)">{{ LangSplit(item.lang) }}</p>
            </td>
            <td>
              <p :title="item.clone_url">{{ item.clone_url }}</p>
            </td>
            <td>
              <p>{{ dateCreate(item.created_at) }}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
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
    LangSplit(list) {
      return list;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 90%;
  background: #e2e2e2;
  padding: 20px;
  border-radius: 5px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &_post {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    background: rgba(89, 158, 137, 0.867);
    border-radius: 5px;
    padding: 20px;
    margin: 0 auto;
    &_icon {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
      }
    }
    &_info {
      &-link {
        margin: 10px 0;
        a {
          font-size: 1.6rem;
          color: rgb(46, 84, 85);
          transition: 0.5s;
          &:hover {
            color: rgb(0, 0, 0);
          }
        }
      }
      &-date {
        p {
          font-weight: 800;
        }
      }
    }
  }
  &_repos {
    width: 100%;
    background: #fff;
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    &-heading {
    }
    &-list {
      background: #e2e2e2;
      padding: 0;
      overflow-y: scroll;
      height: 350px;
      &-item {
        border-bottom: 1px solid rgb(179, 179, 179);
        transition: 0.5s;

        &:hover {
          background: rgb(175, 175, 175);
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
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    margin-left: 10px;
    width: calc(70% - 10px);
    &-list {
      overflow-y: scroll;
      height: 100%;
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
    }
    &-item {
      display: flex;
      padding: 3px 10px;
      width: 50%;
      transition: 0.5s;
      &:hover {
        background: rgb(63, 130, 133);
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
        color: #000;
        font-size: 18px;
      }
    }
  }
}
.table {
  &_heading {
    background: #909090;
  }
}
th {
  color: #fff;
}
.card {
  width: 30%;
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