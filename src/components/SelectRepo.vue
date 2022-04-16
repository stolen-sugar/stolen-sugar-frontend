<template>
  <div>
    <div class="columns is-centered has-text-centered">
      <div class="column is-narrow">
        <button
          class="button is-info is-outlined has-text-centered"
          @click="getIds"
        >
          Link knausj_talon fork
          <kbd
            v-show="!hideAllhotkeys"
            class="action-group-high__action-hotkey hotkey-dark"
            title="Keyboard shortcut: G"
            >G</kbd
          >
        </button>
      </div>
      <div class="column is-narrow">
        <button
          class="button is-info is-outlined has-text-centered"
          @click="useKnausjTalon"
        >
          Use default knausj_talon
          <kbd
            v-show="!hideAllhotkeys"
            class="action-group-high__action-hotkey hotkey-dark"
            title="Keyboard shortcut: M"
            >M</kbd
          >
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
                  ref="textNameField"
                  @focusout="enableHotkeys()"
                  @focus="disableHotkeys()"
                  tabindex="0"
                  v-model="userName"
                />
                <kbd
                  v-show="!hideAllhotkeys"
                  class="action-group__action-hotkey hotkey-dark"
                  title="Keyboard shortcut: H"
                  >H</kbd
                >
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <button class="button is-info is-outlined" @click="linkUserRepo">
          search users
          <kbd
            v-show="!hideAllhotkeys"
            class="action-group-high__action-hotkey hotkey-dark"
            title="Keyboard shortcut: L"
            >L</kbd
          >
        </button>
      </div>
      <div></div>
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
      usersUrl: "http://ss117-726630833.us-east-2.elb.amazonaws.com/users",
      state: "done",
      users: [],
      userName: "",
      searchResultMessage: "",
    };
  },
  computed: {
    hideAllhotkeys() {
      return (
        this.$root.$data.shared.keysHidden() ||
        this.$cookies.isKey("hideAllHotkeys")
      );
    },
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
    disableHotkeys() {
      this.searchResultMessage = "";
      this.$root.$data.shared.hideHotKeys = true;
    },
    enableHotkeys() {
      this.$root.$data.shared.hideHotKeys = false;
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
    focusUsernameInput() {
      this.$refs.textNameField.focus();
      this.$root.$data.shared.hideHotKeys = true;
    },
  },
  mounted() {
    var self = this;
    document.body.addEventListener("keyup", function (event) {
      if (self.$root.$data.shared.keysHidden()) return;
      switch (event.key) {
        case "g":
          self.getIds();
          break;
        case "m":
          self.useKnausjTalon();
          break;
        case "h":
          self.focusUsernameInput();
          break;
        case "l":
          self.linkUserRepo();
          break;
        default:
          break;
      }
    });
  },
};
</script>

<style></style>
