<template>
  <footer class="footer">
    <div class="content has-text-centered">
      <img
        class="logo-text"
        alt="stolen sugar logo"
        src="../assets/logo-text.svg"
      />
      <p>
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
      </p>
    </div>
    <div class="content has-text-right">
      <button class="button is-danger">
        alphabet
        <kbd
          class="action-group-high__action-hotkey"
          title="Keyboard shortcut: 7"
          >7</kbd
        >
      </button>
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
</style>
