require("@/assets/main.scss");
import Vue from "vue";

Vue.config.productionTip = false;

import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";
import ExploreAlternatives from "./pages/Explore.vue";

const routes = {
  "/": Home,
  "/explore": ExploreAlternatives,
};

const shared = {
  hideHotKeys: false,
  alwaysHideHotkeys: false,
  keysHidden() {
    return this.hideHotKeys || this.alwaysHideHotkeys;
  },
  activeGroup: null,
};

new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
    shared,
  },
  computed: {
    ViewComponent() {
      return routes[this.currentRoute] || NotFound;
    },
  },
  render(h) {
    return h(this.ViewComponent);
  },
});
