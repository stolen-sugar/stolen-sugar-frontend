<template>
  <MainLayout>
    <SelectRepo v-if="!$cookies.get('ss-id')"></SelectRepo>
    <div v-else class="container">
      <div class="columns is-vcentered is-centered has-text-centered">
        <div class="column">
          <h1 class="title">Explore spoken phrases</h1>
        </div>
        <div class="column">
          <p class="content">
            *Actions without alternate spoken phrases are ignored.
          </p>
        </div>
      </div>
      <div class="tabs is-centered is-boxed">
        <ul>
          <li
            v-bind:class="{
              'is-active': activeTab === 'talon',
            }"
          >
            <a v-on:click="switchActiveTab('talon')"
              >Talon
              <kbd
                v-show="!hideAllhotkeys"
                class="action-group-inherit__action-hotkey hotkey-dark"
                title="Keyboard shortcut: f"
                >f</kbd
              >
            </a>
          </li>
          <li
            v-bind:class="{
              'is-active': activeTab === 'cursorless',
            }"
          >
            <a v-on:click="switchActiveTab('cursorless')"
              >Cursorless
              <kbd
                v-show="!hideAllhotkeys"
                class="action-group-inherit__action-hotkey hotkey-dark"
                title="Keyboard shortcut: e"
                >e</kbd
              >
            </a>
          </li>
        </ul>
      </div>
      <div class="columns explorer-search-container">
        <div class="column is-narrow">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label file-label">File Path</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="code/keys.py"
                    ref="textField"
                    @focusout="enableHotkeys()"
                    @focus="disableHotkeys()"
                    tabindex="0"
                    v-model="fileTarget"
                  />
                  <kbd
                    v-show="!hideAllhotkeys"
                    class="action-group__action-hotkey hotkey-dark"
                    title="Keyboard shortcut: A"
                    >A</kbd
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <button
            class="button is-info is-outlined"
            ref="searchByFile"
            @click="getSpokenFormByFile"
          >
            search

            <kbd
              v-show="!hideAllhotkeys"
              class="action-group-high__action-hotkey hotkey-dark"
              title="Keyboard shortcut: B"
              >B</kbd
            >
          </button>
        </div>
      </div>
    </div>
    <div>
      <div class="has-text-centered">
        <pulse-loader
          v-if="state === 'loading'"
          class="loader-rise has-text-centered"
          color="#3e8ed0"
        >
        </pulse-loader>
      </div>
      <SpokenPhraseGroupList :list="spokenFormGroups"></SpokenPhraseGroupList>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";
import SpokenPhraseGroupList from "@/components/SpokenPhraseGroupList.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import SelectRepo from "@/components/SelectRepo.vue";

export default {
  name: "ExploreAlternates",
  components: {
    MainLayout,
    SpokenPhraseGroupList,
    PulseLoader,
    SelectRepo,
  },
  data: function () {
    return {
      appTarget: "talon",
      includeEmptyPhrases: false,
      fileTarget: null,
      actionNameTarget: null,
      showModal: false,
      hotkeyHideLevel: 0,
      spokenFormByFileUrl:
        "https://stolen-sugar.herokuapp.com/spokenform?file=",
      spokenFormByNameUrl: "http://localhost:8080/spokenformbyname?name=",
      activeTab: "talon",
      spokenFormGroups: {},
      contextList: [],
      state: "done",
    };
  },
  methods: {
    switchActiveTab(app) {
      this.activeTab = app;
    },
    focusFileInput() {
      this.$refs.textField.focus();
      this.$root.$data.shared.hideHotKeys = true;
    },
    disableHotkeys() {
      this.$root.$data.shared.hideHotKeys = true;
    },
    enableHotkeys() {
      this.$root.$data.shared.hideHotKeys = false;
    },
    toggleEmptyPhrases() {
      this.$refs.emptyPhrases.click();
    },
    searchByFile() {
      this.$refs.searchByFile.click();
    },
    getSpokenFormByFile() {
      if (this.fileTarget === null) return;
      this.state = "loading";
      let url = this.spokenFormByFileUrl + this.fileTarget;
      let self = this;
      fetch(url)
        .then(function (response) {
          if (response.status !== 200) {
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            return;
          }
          response.json().then(function (data) {
            self.spokenFormGroups = data.spokenFormGroups;
            let context = Object.keys(self.spokenFormGroups);
            for (let index = 0; index < context.length; index++) {
              self.contextList[index] = context[index];
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
  computed: {
    hideAllhotkeys() {
      return (
        this.$root.$data.shared.keysHidden() ||
        this.$cookies.isKey("hideAllHotkeys")
      );
    },
  },
  mounted() {
    var self = this;
    document.body.addEventListener("keyup", function (event) {
      if (self.$root.$data.shared.keysHidden()) return;
      switch (event.key) {
        case "a":
          self.focusFileInput(self);
          break;
        case "b":
          self.searchByFile();
          break;
        case "e":
          self.switchActiveTab("cursorless");
          break;
        case "f":
          self.switchActiveTab("talon");
          break;

        default:
          break;
      }
    });
  },
};
</script>

<style>
.column {
  margin-top: 1em;
}
.explorer-search-container {
  margin: 2em !important;
}
.file-label {
  min-width: 5em;
}

.hotkey-dark {
  background: #e8e8e8 !important;
  color: #000;
}

.field-label.is-normal {
  padding-top: 0.5em;
  min-width: 9em;
}
</style>
