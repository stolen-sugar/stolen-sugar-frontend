<template>
  <MainLayout>
    <div class="container">
      <h1 class="title has-text-centered">
        Discover Alternative Spoken Phrases for Talon
      </h1>
      <h2 class="subtitle about">About</h2>
      <p class="content">
        We steal custom spoken phrases from the various forks of
        <a href="https://github.com/knausj85/knausj_talon">knausj_talon</a>
        and make them available to be searched by file.
      </p>
      <p class="content">
        Stolen Sugar was created by
        <a class="ss-team" href="https://github.com/daslater">David Slater</a>,
        <a class="ss-team" href="https://github.com/EvanPollak">
          Evan Pollak
        </a>
        and
        <a class="ss-team" href="https://github.com/RonWalker22">Ron Walker</a>.
        Some of the code used to extract the talon commands used Tarrays’
        <a
          href="https://gist.github.com/tararoys/7412364aff8d24a4603af9eb8fba86f5"
          >cheatsheet</a
        >
        as a foundation.
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
        <a href="https://mochi.cards/"> Mochi </a>. If necessary you can watch a
        demo video
        <a href="https://www.youtube.com/watch?v=9ywpvzbB6UI"> here </a>.
      </p>
      <h2 class="subtitle">Website Voice Navigation</h2>
      <p class="content">
        You can easily navigate the website with your voice by using
        <strike>the denoted hotkeys</strike>
        <a href="https://github.com/david-tejada/rango"> Rango</a>.
      </p>
      <h2 class="subtitle">Repository Search Area</h2>
      <p class="content">
        We expect your talon repository to be a publicly available
        <a href="https://github.com/knausj85/knausj_talon/network/members"
          >knausj_talon fork </a
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
