<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://www.stolensugar.com/">
        <img class="logo" src="../assets/logo.svg" alt="stolen sugar logo" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a href="/" class="navbar-item" id="home-page-link">
          Home

          <kbd
            v-show="!hideAllhotkeys"
            class="action-group__action-hotkey"
            title="Keyboard shortcut: 1"
            >1</kbd
          >
        </a>
        <a href="explore" class="navbar-item" id="explore-page-link">
          Explore
          <kbd
            v-show="!hideAllhotkeys"
            class="action-group__action-hotkey"
            title="Keyboard shortcut: 2"
            >2</kbd
          >
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    goToHome() {
      document.getElementById("home-page-link").click();
    },
    goToExplore() {
      document.getElementById("explore-page-link").click();
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
      if (event.key == 1) {
        self.goToHome();
      } else if (event.key == 2) {
        self.goToExplore();
      }
    });
  },
};
</script>

<style>
.is-primary {
  background: transparent !important;
}

.is-primary:active {
  background: black !important;
}
</style>
