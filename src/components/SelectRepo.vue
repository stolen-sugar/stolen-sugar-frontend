<template>
  <div>
    <div class="columns is-centered has-text-centered">
      <div class="column is-narrow">
        <button
          class="button is-info is-outlined has-text-centered"
          @click="getIds"
        >
          Link knausj_talon fork
        </button>
      </div>
      <div class="column is-narrow">
        <button
          class="button is-info is-outlined has-text-centered"
          @click="useKnausjTalon"
        >
          Use default knausj_talon
        </button>
      </div>
    </div>
    <div v-if="users.length > 0" class="columns is-centered">
      <div class="column is-narrow">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label file-label">Github username</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="knausj85"
                  tabindex="0"
                  v-model="userName"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <button class="button is-info is-outlined" @click="linkUserRepo">
          search users
        </button>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-narrow">
        <p v-if="searchResultMessage.length > 0">
          {{ searchResultMessage }}
        </p>
      </div>
    </div>
    <div class="has-text-centered">
      <pulse-loader
        v-if="state === 'loading'"
        class="loader-rise has-text-centered"
        color="#3e8ed0"
      >
      </pulse-loader>
    </div>
  </div>
</template>

<script>
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

export default {
  name: "SelectRepo",
  components: {
    PulseLoader,
  },
  data: function () {
    return {
      ssId: null,
      usersUrl: "https://stolen-sugar.herokuapp.com/users",
      state: "done",
      users: [],
      userName: "",
      searchResultMessage: "",
    };
  },
  methods: {
    useKnausjTalon() {
      this.userName = "knausj85";
      this.getIds();
    },
    linkUserRepo() {
      if (this.userName === null || this.userName.length < 1) return;
      this.users.forEach((element) => {
        if (element.name.toLowerCase() === this.userName.toLowerCase()) {
          this.$cookies.set("ss-id", element.id);
        }
      });
      if (this.$cookies.isKey("ss-id")) {
        this.searchResultMessage = "Successful linked!";
        setTimeout(function () {
          window.location.reload();
        }, 1000);
      } else {
        this.searchResultMessage =
          "User " +
          this.userName +
          " was not found to have a public fork of knausj_talon.";
      }
    },
    getIds() {
      this.state = "loading";
      let self = this;
      fetch(this.usersUrl)
        .then(function (response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }

          response.json().then(function (data) {
            self.users = data.users;
            if (self.userName === "knausj85") {
              self.linkUserRepo();
            }
            self.state = "done";
          });
        })
        .catch(function (err) {
          self.state = "done";
          console.log("Fetch Error :-S", err);
        });
    },
  },
};
</script>

<style></style>
