<template>
  <dir>
    <div class="hero-body has-text-centered">
      <p class="title">Discover Alternative Spoken Phrases</p>
    </div>
    <section class="section">
      <div class="columns">
        <div class="column">
          <button class="button talon-box is-large is-fullwidth">
            Talon

            <kbd
              class="action-group__action-hotkey"
              title="Keyboard shortcut: t"
              >t</kbd
            >
          </button>
        </div>
        <div class="column">
          <button class="button is-large is-fullwidth cursorless-box">
            Cursorless
            <kbd
              class="action-group__action-hotkey"
              title="Keyboard shortcut: c"
              >c</kbd
            >
          </button>
        </div>
      </div>
    </section>
  </dir>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  // mounted() {
  //   document.title = "new app";
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.talon-box {
  background: #b22222;
  color: #fff;
}

.cursorless-box {
  background: #000;
  color: #fff;
}
</style>
