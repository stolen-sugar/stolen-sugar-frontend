<template>
  <MainLayout>
    <div class="container">
      <h1 class="title has-text-centered">
        Discover Alternative Spoken Phrases for Talon
      </h1>
      <h2 class="subtitle about">About</h2>
      <p class="content">
        We steal custom spoken phrases from the various forks of
        <a
          href="https://github.com/knausj85/knausj_talon"
          id="knausj-talon-repo-link"
          >knausj_talon
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: A"
            >A</kbd
          ></a
        >
        and make them available to be searched by file.
      </p>
      <p class="content">
        Stolen Sugar was created by
        <a
          class="ss-team"
          href="https://github.com/daslater"
          id="david-slater-github-link"
          >David Slater
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: B"
            >B</kbd
          ></a
        >,
        <a
          class="ss-team"
          href="https://github.com/EvanPollak"
          id="evan-pollak-github-link"
        >
          Evan Pollak
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: G"
            >g</kbd
          >
        </a>
        and
        <a
          class="ss-team"
          href="https://github.com/RonWalker22"
          id="ronald-walker-github-link"
          >Ron Walker
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: C"
            >C</kbd
          ></a
        >.
      </p>
      <h2 class="subtitle">Flashcards</h2>
      <p class="content">
        You can generate flashcards that are mapped to your custom spoken
        phrases. From the Explore tab, after you input a file path and click
        "Create Flashcards" the app will generate json. Copy the contents of the
        json file into a new file called: `data.json` Then compress the file and
        change the extenstion from `.zip` to `.mochi`.
      </p>
      <p class="content">
        Finally, import the file at
        <a href="https://mochi.cards/" id="mochi-link">
          Mochi
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: H"
            >H
          </kbd> </a
        >. If necessary you can watch a demo video
        <a
          href="https://www.youtube.com/watch?v=9ywpvzbB6UI"
          id="mochi-demo-link"
        >
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: L"
            >L
          </kbd>
          here </a
        >.
      </p>
      <h2 class="subtitle">Website Voice Navigation</h2>
      <p class="content">
        You can easily navigate the website with your voice by using the denoted
        hotkeys. Each hotkey is either a number or letter.
      </p>
      <p class="content">
        When you focus on an input element like "File Path", hotkeys are
        temporarily disabled. Escape or tab to exit input element.
      </p>
      <h2 class="subtitle">Repository Search Area</h2>
      <p class="content">
        We expect your talon repository to be a publicly available
        <a
          href="https://github.com/knausj85/knausj_talon/network/members"
          id="knausj-talon-repo-link"
          >knausj_talon fork
          <kbd
            v-show="!hideAllhotkeys"
            class="hotkey-dark"
            title="Keyboard shortcut: D"
            >D
          </kbd> </a
        >, otherwise we don't know it exists. We usually associate your branch
        with the default branch. So if you use a different branch, please notify
        us by submitting an issue.
      </p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from "@/layouts/MainLayout.vue";

export default {
  name: "HelloWorld",
  components: {
    MainLayout,
  },
  methods: {
    setCookie() {
      this.$cookies.set("ss-id", "gowtham");
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
    document.body.addEventListener("keyup", function (event) {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey)
        return;
      switch (event.key) {
        case "a":
          document.getElementById("knausj-talon-repo-link").click();
          break;
        case "b":
          document.getElementById("david-slater-github-link").click();
          break;
        case "c":
          document.getElementById("ronald-walker-github-link").click();
          break;
        case "d":
          document.getElementById("knausj-talon-repo-link").click();
          break;
        case "g":
          document.getElementById("evan-pollak-github-link").click();
          break;
        case "h":
          document.getElementById("mochi-link").click();
          break;
        case "l":
          document.getElementById("mochi-demo-link").click();
          break;
        default:
          break;
      }
    });
  },
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

.container {
  padding-right: 2em;
  padding-left: 2em;
  margin-top: 3em !important;
}

.about {
  margin-top: 3em !important;
}
</style>
