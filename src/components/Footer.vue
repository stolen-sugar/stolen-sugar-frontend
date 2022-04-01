<template>
  <footer class="footer">
    <p class="has-text has-text-centered">
      <img
        class="logo-text"
        alt="stolen sugar logo"
        src="../assets/logo-text.svg"
      />
    </p>
    <div class="columns is-centered has-text-centered">
      <div class="column">
        <div class="content">
          <button class="button is-white danger-white">
            hotkeys
            <kbd
              class="action-group-high__action-hotkey"
              title="Keyboard shortcut: 7"
              >7</kbd
            >
          </button>
        </div>
      </div>
      <div class="column"></div>
      <div class="column">
        <a href="https://github.com/stolen-sugar">
          <img
            id="github-logo"
            alt="github logo"
            src="../assets/github-logo.svg"
          />
          <kbd
            class="action-group-inherit__action-hotkey"
            title="Keyboard shortcut: 5"
            >5</kbd
          >
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.footer {
  background: black !important;
}

.danger-white {
  background-color: transparent !important;
  border-color: transparent !important;
  color: #fff !important;
  text-decoration: underline;
}
</style>
