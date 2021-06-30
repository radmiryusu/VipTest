<template>
  <div class="content">
    <div class="content_forms">
      <div class="team">
        <div class="team-heading">
          <div class="team-title">
            <h2 class="team-title-heading">Cписок команды</h2>
          </div>
          <div class="team-sort">
            <b-button @click="SortFriend()" variant="btn btn-outline-secondary"
              >sort</b-button
            >
          </div>
        </div>
        <div class="team_container">
          <ul class="team_list">
            <li
              @click="ClassTrue(item.id, listFriends)"
              :class="{ active: trueId === item.id }"
              class="team_list-item"
              v-for="item in listFriends"
              :key="item.id"
            >
              <div class="team_list-img">
                <img :src="item.avatar_url" alt="" />
              </div>
              <div class="team_list-name">
                <p>{{ item.login }}</p>
                <a :href="item.html_url"> {{ item.html_url }} </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="team-button">
          <b-button @click="DeletPerson()" variant="outline-danger"
            >delet</b-button
          >
        </div>
      </div>
      <div class="users">
        <div class="users-heading">
          <div class="users-title">
            <h2 class="users-title-heading">Cписок git</h2>
          </div>
          <div class="users-serch">
            <input
              class="users-serch-input"
              type="text"
              name=""
              id=""
              @change="SearchPerson"
              v-model="serchData"
            />
          </div>
        </div>
        <div class="users_container">
          <ul class="users_list">
            <li
              :id="item.id"
              @click="ClassTrue(item.id, AllPerson)"
              class="users_list-item"
              :class="{ active: trueId === item.id }"
              v-for="item in SearchPerson"
              :key="item.id"
            >
              <div class="users_list-img">
                <img :src="item.avatar_url" alt="" />
              </div>
              <div class="users_list-name">
                <p>{{ item.login }}</p>
                <a :href="item.html_url"> {{ item.html_url }} </a>
              </div>
            </li>
          </ul>
        </div>
        <div class="users-button">
          <b-button @click="addFriend()" variant="outline-primary"
            >add</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      trueId: "",
      listFriends: [],
      sortFriends: false,
      serchData: "",
    };
  },
  created() {
    this.dataPersons();
  },
  computed: {
    ...mapGetters(["AllPerson"]),
    SearchPerson() {
      return this.AllPerson.filter(
        (item) => !item.login.indexOf(this.serchData)
      );
    },
  },
  methods: {
    ...mapActions(["dataPersons", "newPersonsList"]),
    ClassTrue(id, list) {
      for (let item of list) {
        if (id === item.id) {
          this.trueId = id;
        }
      }
    },
    addFriend() {
      this.AllPerson.forEach((item, index) => {
        if (item.id === this.trueId) {
          this.listFriends.push(item);
          let allPerson = this.AllPerson;
          allPerson.splice(index, 1);
          this.trueId = "";
          this.newPersonsList(allPerson);
        }
      });
    },
    DeletPerson() {
      this.listFriends.forEach((item, index) => {
        if (item.id === this.trueId) {
          this.listFriends.splice(index, 1);
          let data = [];
          this.AllPerson.forEach((item) => {
            data.push(item);
          });
          data.push(item);
          this.newPersonsList(data);
          this.trueId = "";
        }
      });
    },
    //сортирует при добавлении, поэтому сначала меняется состояние
    SortFriend() {
      this.sortFriends = !this.sortFriends;
      this.listFriends.sort(function (a, b) {
        if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
        if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
        return 0;
      });
      if (this.sortFriends) this.listFriends.reverse();
    },
  },
  watch: {
    AllPerson() {
      this.listFriends.sort(function (a, b) {
        if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
        if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
        return 0;
      });
      if (this.sortFriends) this.listFriends.reverse();
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../scss/color.scss";
.content {
  border-radius: 5px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;

  &_forms {
    display: flex;
    justify-content: space-between;
  }
}
.team,
.users {
  padding: 10px;
  width: 50%;
  margin: 10px;
  border: 1px solid rgb(179, 179, 179);
  -webkit-box-shadow: 2px 2px 5px 0px rgba(185, 185, 185, 0.75);
  -moz-box-shadow: 2px 2px 5px 0px rgba(185, 185, 185, 0.75);
  box-shadow: 2px 2px 5px 0px rgba(185, 185, 185, 0.75);
  border-radius: 5px;
  &-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin: 5px 0;
  }
  &-title {
    &-heading {
      font-size: 20px;
    }
  }
  &_container {
    background: #fff;
  }
  &_list {
    overflow-y: scroll;
    border: 1px solid #f1f1f1;
    height: 300px;
    margin: 0;
    padding: 0;
    &-img {
      width: 35px;
      height: 35px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-item {
      padding: 5px;
      display: flex;
      align-items: center;
      transition: 0.5s;
      border-bottom: 1px solid #f1f1f1;
      &:hover {
        background: rgb(216, 216, 216);
      }
      &:first-child {
        
      }
    }
    &-name {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: calc(100% - 45px);
      margin-left: 10px;
    }
  }
  &-button {
    width: 100%;
    margin-top: 5px;
    height: 30px;
    button {
      width: 100%;
      height: 100%;
      line-height: 15px;
    }
  }
  &-serch {
    width: 70%;
    &-input {
      width: 100%;
    }
  }
}
.active {
  background: rgb(216, 216, 216);
}
@media (min-width: 320px) and (max-width: 479px) {
  .content {
    padding: 0;
    width: 100%;
    &_forms {
      flex-wrap: wrap;
    }
  }
  .team,
  .users {
    width: calc(100% - 20px);
    &_list {
      &-name {
        a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: left;
        }
      }
    }
  }
}
@media (min-width: 480px) and (max-width: 767px) {
  .content {
    padding: 0;
    width: 100%;
    &_forms {
      flex-wrap: wrap;
    }
  }
  .team,
  .users {
    width: calc(100% - 20px);
    &_list {
      &-name {
        a {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          text-align: left;
        }
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1023px) {
  .content {
    padding: 0;
    width: 100%;
  }
}
</style>
