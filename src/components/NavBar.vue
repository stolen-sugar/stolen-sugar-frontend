<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://www.stolensugar.com/">
        <img class="logo" src="../assets/logo.svg" alt="stolen sugar logo" />
      </a>

      <a
        role="button"
        class="navbar-burger"
        v-bind:class="{ 'is-active': burgerActive }"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
        @click="toggleBurger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div
      id="navbarBasicExample"
      class="navbar-menu"
      v-bind:class="{ 'is-active': burgerActive }"
    >
      <div class="navbar-start">
        <a href="/" class="navbar-item" id="home-page-link"> Home </a>
        <a href="explore" class="navbar-item" id="explore-page-link">
          Explore
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data: function () {
    return {
      burgerActive: false,
    };
  },
  methods: {
    toggleBurger() {
      this.burgerActive = !this.burgerActive;
    },
    goToHome() {
      document.getElementById("home-page-link").click();
    },
    goToExplore() {
      document.getElementById("explore-page-link").click();
    },
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
