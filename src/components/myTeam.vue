<template>
  <div class="content row">
    <div class="serch col-4">
      <input
        class="serch-input"
        type="text"
        name=""
        id=""
        @change="Onchanch()"
        v-model="serchData"
      />
    </div>
    <div class="content_forms row">
      <div class="team col-6">
        <div class="team-heading">
          <div class="team-title">
            <h2>список команды</h2>
          </div>
          <div class="team-sort">
            <b-button @click="SortFriend()" variant="secondary">sort</b-button>
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
      <div class="users col-6">
        <div class="users-heading">
          <div class="users-title">
            <h2>список команды</h2>
          </div>
        
        </div>
        <div class="users_container">
          <ul class="users_list">
            <li
              :id="item.id"
              @click="ClassTrue(item.id, AllPerson)"
              class="users_list-item"
              :class="{ active: trueId === item.id }"
              v-for="item in Onchanch"
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
  mounted() {
    this.dataPersons();
    console.log(this.AllPerson);
  },
  computed: {
    ...mapGetters(["AllPerson"]),
    Onchanch() {
      return this.AllPerson.filter(
        (item) => !item.login.indexOf(this.serchData)
      );
    },
  },
  methods: {
    ...mapActions(["dataPersons"]),
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
          this.$store.dispatch("newPersonsList", allPerson);
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
          console.log(data);
          this.$store.dispatch("newPersonsList", data);
          this.trueId = "";
        }
      });
    },
    SortFriend() {
      this.listFriends.sort(function (a, b) {
        if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
        if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
        return 0;
      });
      if (this.sortFriends) this.listFriends.reverse();

      this.sortFriends = !this.sortFriends;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 90%;
  margin: 0 auto;

  &_forms {
    display: flex;
    justify-content: space-between;
  }
}
.team,
.users {
  &-heading {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_container {
    overflow-y: scroll;
    background: #0f0;
    height: 300px;
  }
  &_list {
    margin: 0;
    padding: 0;
    &-img {
      width: 30px;
      height: 30px;
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
      &:hover {
        background: rgb(38, 148, 38);
      }
    }
    &-name {
      margin-left: 10px;
      p {
        text-align: left;
      }
    }
  }
  &-button {
    width: 100%;
    margin-top: 15px;
    height: 30px;
    button {
      width: 100%;
      height: 100%;
      line-height: 15px;
    }
  }
}
.serch {
  margin-left: 60%;
  width: 40%;
  height: 25px;
  &-input {
    height: 100%;
    width: 100%;
  }
}
.active {
  background: rgb(72, 77, 52);
}
</style>