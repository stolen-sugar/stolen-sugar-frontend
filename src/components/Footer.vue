<template>
  <footer class="footer">
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div class="content">
          <button
            v-on:click="activateFooterModal"
            class="button is-white danger-white"
          >
            hotkeys
            <kbd
              v-show="!hideAllhotkeys"
              class="action-group-high__action-hotkey"
              title="Keyboard shortcut: 7"
              >7</kbd
            >
          </button>
        </div>
      </div>
      <div class="column">
        <p class="has-text has-text-centered">
          <img
            class="logo-text"
            alt="stolen sugar logo"
            src="../assets/logo-text.svg"
          />
        </p>
      </div>
      <div class="column">
        <a id="stolen-sugar-github" href="https://github.com/stolen-sugar">
          <img
            id="github-logo"
            alt="github logo"
            src="../assets/github-logo.svg"
          />
          <kbd
            v-show="!hideAllhotkeys"
            class="action-group-inherit__action-hotkey"
            title="Keyboard shortcut: 5"
            >5</kbd
          >
        </a>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': showFooterModal }">
      <div class="modal-background" v-on:click="deactivateFooterModal"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Talon alphabet</p>
        </header>
        <section class="modal-card-body">
          <table
            class="table is-striped has-text-centered is-bordered is-fullwidth"
          >
            <thead>
              <tr>
                <th>Letter</th>
                <th>Spoken Phrase</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(value, name, index) in talonAlphabet"
                v-bind:key="index"
              >
                <td>{{ name }}</td>
                <td>{{ value }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th>Letter</th>
                <th>Spoken Phrase</th>
              </tr>
            </tfoot>
          </table>
        </section>
        <footer class="modal-card-foot">
          <div class="columns">
            <div class="column is-full">
              <button class="button is-info" v-on:click="deactivateFooterModal">
                Close
                <kbd
                  v-show="!hideAllhotkeys"
                  class="action-group-high__action-hotkey hotkey-dark"
                  title="Keyboard shortcut: Z"
                  >Z</kbd
                >
              </button>
            </div>
            <div class="column is-narrow">
              <button
                v-if="!hideAllhotkeys"
                class="button is-danger alwaysToggle"
                v-on:click="disableAllHotkeys"
              >
                disable all hotkeys
              </button>
              <button
                v-else
                class="button is-info alwaysToggle"
                v-on:click="enableAllHotkeys"
              >
                enable all hotkeys
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App",
  data: function () {
    return {
      showFooterModal: false,
      talonAlphabet: {
        A: "Air",
        B: "Bat",
        C: "Cap",
        D: "Drum",
        E: "Each",
        F: "Fine",
        G: "Gust",
        H: "Harp",
        I: "Sit",
        J: "Jury",
        K: "Krunch",
        L: "Look",
        M: "Made",
        N: "Near",
        O: "Odd",
        P: "Pit",
        Q: "Quench",
        R: "Red",
        S: "Sun",
        T: "Trap",
        U: "Urge",
        V: "Vest",
        W: "Whale",
        X: "Plex",
        Y: "Yank",
        Z: "Zip",
      },
    };
  },
  methods: {
    disableAllHotkeys() {
      this.$cookies.set("hideAllHotkeys", true);
      window.location.reload();
    },
    enableAllHotkeys() {
      this.$cookies.remove("hideAllHotkeys");
      window.location.reload();
    },
    activateFooterModal() {
      this.showFooterModal = true;
    },
    deactivateFooterModal() {
      this.showFooterModal = false;
    },
    goToGithub() {
      document.getElementById("stolen-sugar-github").click();
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
      if (self.hideAllhotkeys) return;
      switch (event.key) {
        case "7":
          self.activateFooterModal();
          break;
        case "5":
          self.goToGithub();
          break;
        case "z":
          self.deactivateFooterModal();
          break;
        default:
          break;
      }
    });
  },
};
</script>

<style>
.danger-white {
  background-color: transparent !important;
  border-color: transparent !important;
  color: #fff !important;
}

.danger-white:hover {
  background-color: transparent !important;
  border-color: transparent !important;
  background: #3e8ed0 !important;
}

.alwaysToggle {
  min-width: 15em;
}
</style>
