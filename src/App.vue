<template>
  <div id="app">
    <div class="base">
      <NavBar />
      <HelloWorld msg="Welcome to Your Vue.js App" />
    </div>
    <Footer />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
    Footer,
    NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

html,
body,
#app {
  height: 100%;
}
#app {
  display: flex;
  flex-direction: column;
}
.base {
  flex: 1 0 auto;
}
</style>
