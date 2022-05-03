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
                    tabindex="0"
                    v-model="fileTarget"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <button
            class="button is-info is-outlined"
            @click="getSpokenFormByFile"
          >
            search
          </button>
        </div>
        <div class="column is-narrow">
          <button class="button is-info is-outlined" @click="getFlashcards">
            Create Flashcards
          </button>
          <div
            class="modal"
            v-bind:class="{ 'is-active': showFlashcardsModal }"
          >
            <div
              v-on:click="deactivateFlashcardsModal"
              class="modal-background"
            ></div>
            <div class="modal-card">
              <header class="modal-card-head">
                <p class="modal-card-title">
                  <button
                    v-on:click="copyFlashcardsFile"
                    class="button is-info is-large"
                  >
                    copy file
                  </button>
                </p>
                <button
                  v-on:click="deactivateFlashcardsModal"
                  class="button is-large is-danger"
                >
                  close
                </button>
              </header>
              <section class="modal-card-body" id="flashcards-file">
                {{ flashcardsDeck }}
              </section>
            </div>
          </div>
        </div>
      </div>
      <div v-if="fileNotFoundMessage" class="columns is-centered">
        <div class="column is-narrow">
          <p class="danger-color">That file was not found.</p>
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
      fileTarget: null,
      showModal: false,
      showFlashcardsModal: false,
      spokenFormByFileUrl:
        "https://stolen-sugar.herokuapp.com/spokenform?file=",
      flashcardsUrlBase: "https://stolen-sugar.herokuapp.com/flashcards/",
      flashcardsDeck: {},
      fileNotFoundMessage: false,
      spokenFormGroups: {},
      contextList: [],
      state: "done",
    };
  },
  methods: {
    copyFlashcardsFile() {
      let copyText = document.getElementById("flashcards-file");
      navigator.clipboard.writeText(copyText.textContent);
    },
    activateFlashcardsModal() {
      this.showFlashcardsModal = true;
    },
    deactivateFlashcardsModal() {
      this.showFlashcardsModal = false;
    },
    toggleEmptyPhrases() {
      this.$refs.emptyPhrases.click();
    },
    searchByFile() {
      this.$refs.searchByFile.click();
    },
    createFlashcards() {
      this.$refs.createFlashcards.click();
    },
    getFlashcards() {
      if (this.fileTarget === null) return;
      this.fileNotFoundMessage = false;
      this.state = "loading";
      let user = this.$cookies.get("ss-id");
      let file = `?file=${this.fileTarget}`;
      let url = this.flashcardsUrlBase + user + file;
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
            if (data["~:decks"][0]["~:cards"]["~#list"].length < 1) {
              self.fileNotFoundMessage = true;
            } else {
              self.flashcardsDeck = data;
              self.activateFlashcardsModal();
            }
            self.state = "done";
          });
        })
        .catch(function (err) {
          self.state = "done";
          console.log("Fetch Error :-S", err);
        });
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

.field-label.is-normal {
  padding-top: 0.5em;
  min-width: 9em;
}

.danger-color {
  color: hsl(348, 100%, 61%);
}
</style>
