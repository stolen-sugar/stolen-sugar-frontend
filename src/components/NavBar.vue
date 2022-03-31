<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
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
        <a class="navbar-item">
          Explore

          <kbd class="action-group__action-hotkey" title="Keyboard shortcut: 1"
            >1</kbd
          >
        </a>
        <a class="navbar-item">
          Sync
          <kbd class="action-group__action-hotkey" title="Keyboard shortcut: 2"
            >2</kbd
          >
        </a>
        <a class="navbar-item">
          Flashcards
          <kbd class="action-group__action-hotkey" title="Keyboard shortcut: 3"
            >3</kbd
          >
        </a>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              Switch to Cursorless
              <kbd
                class="action-group-high__action-hotkey"
                title="Keyboard shortcut: 4"
                >4</kbd
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style></style>
