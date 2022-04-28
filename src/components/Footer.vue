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
          <p class="modal-card-title">Hotkeys</p>
        </header>
        <section class="modal-card-body">
          <div class="columns is-centered">
            <div class="column is-narrow">
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
        </section>
        <footer class="modal-card-foot"></footer>
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
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
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
