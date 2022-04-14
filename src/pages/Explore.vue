<template>
  <MainLayout>
    <div class="container">
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
                    v-bind:class="{
                      'hide-hotkey': keysHidden(this),
                    }"
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
        <div class="column">
          <button
            v-if="contextList.length > 0"
            v-on:click="activateModal"
            class="button is-info is-outlined"
          >
            select context
            <kbd
              v-show="!hideAllhotkeys"
              class="action-group-high__action-hotkey hotkey-dark"
              title="Keyboard shortcut: C"
              >C</kbd
            >
          </button>
          <div class="modal" v-bind:class="{ 'is-active': showModal }">
            <div class="modal-background" v-on:click="deactivateModal"></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">Select context</p>
              </header>
              <section class="modal-card-body">
                <div class="buttons">
                  <button
                    class="button is-link is-outlined"
                    v-for="(context, index) in contextList"
                    :key="index"
                  >
                    {{ context }}
                    <kbd
                      v-show="!hideAllhotkeys"
                      class="action-group-high__action-hotkey hotkey-dark"
                      title="Keyboard shortcut: A"
                      >A</kbd
                    >
                  </button>
                </div>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-info" v-on:click="deactivateModal">
                  Cancel
                  <kbd
                    v-show="!hideAllhotkeys"
                    class="action-group-high__action-hotkey hotkey-dark"
                    title="Keyboard shortcut: Z"
                    >Z</kbd
                  >
                </button>
              </footer>
            </div>
          </div>
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

export default {
  name: "ExploreAlternates",
  components: {
    MainLayout,
    SpokenPhraseGroupList,
    PulseLoader,
  },
  data: function () {
    return {
      appTarget: "talon",
      includeEmptyPhrases: false,
      fileTarget: null,
      contextTarget: null,
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
    activateModal() {
      this.showModal = true;
    },
    deactivateModal() {
      this.showModal = false;
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
    keysHidden() {
      this.$root.$data.shared.keysHidden();
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

          // Examine the text in the response
          // code/keys.py
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
      return this.$root.$data.shared.keysHidden();
    },
  },
  mounted() {
    var self = this;
    document.body.addEventListener("keyup", function (event) {
      if (self.$root.$data.shared.keysHidden()) return;
      if (event.key == "c") {
        self.activateModal();
      }
      switch (event.key) {
        case "a":
          self.focusFileInput(self);
          break;
        case "b":
          self.searchByFile();
          break;
        case "c":
          self.activateModal();
          break;
        case "z":
          self.deactivateModal();
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

.hide-hotkey {
  display: none;
}
</style>
