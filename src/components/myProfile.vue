<template>
  <div class="content">
    <div class="content_post">
      <div class="content_post_icon">
        <img :src="this.Profile.avatar_url" alt="" />
      </div>
      <div class="content_post_info">
        <div class="content_post_info-link">
          <a :href="linkGitHub">{{ this.Profile.login }}</a>
        </div>
        <div class="content_post_info-date">
          <p>{{ dateCreate(this.Profile.created_at) }}</p>
        </div>
      </div>
    </div>
    <div class="content_repos">
      <div class="content_repos-heading">
        <h2>Репозитории пользователя</h2>
      </div>
      <ul class="content_repos-list">
        <li
          class="content_repos-list-item"
          v-for="item in this.Reposit"
          :key="item.id"
        >
          <div class="content_repos-name">
            <a :href="item.html_url">
              {{ item.name }}
            </a>
          </div>
          <div class="content_repos-descript">
            <p>{{ item.description }}</p>
          </div>
          <div class="content_repos-lang">
            <p>{{ LangSplit(item.lang) }}</p>
          </div>
          <div class="content_repos-link">
            <p>{{ item.clone_url }}</p>
          </div>
          <div class="content_repos-date">
            <p>{{ dateCreate(item.created_at) }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="content_sub">
      <ul class="content_sub-list">
        <li class="content_sub-item" v-for="item in Subscribers" :key="item.id">
          <div class="content_sub-img">
            <img :src="item.avatar_url" alt="" />
          </div>
          <div class="content_sub-link">
            <a :href="item.html_url"> {{ item.name }} </a>
          </div>
        </li>
      </ul>
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
  width: 80%;
  margin: 20px auto;

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
    &-heading {
    }
    &-list {
      padding: 0;
      background: rgb(80, 164, 167);
      overflow-y: scroll;
      height: 350px;
      &-item {
        padding: 3px 10px;
        display: flex;
        height: 50px;
        justify-content: space-between;
        align-content: center;
        border-bottom: 1px solid rgb(179, 179, 179);
        transition: 0.5s;

        &:hover {
          background: rgb(175, 175, 175);
        }
      }
    }
    &-name,
    &-descript,
    &-lang,
    &-date,
    &-link {
      * {
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden; /* Обрезаем все, что не помещается в область */
        text-overflow: ellipsis; /* Добавляем многоточие */
      }
    }
    &-name,
    &-descript,
    &-lang,
    &-date,
    &-link {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 25%;
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
    background: rgb(80, 164, 167);
    height: 350px;
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
</style>
