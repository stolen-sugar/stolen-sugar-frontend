require("@/assets/main.scss");
import Vue from "vue";

Vue.config.productionTip = false;

import Home from "./pages/Home.vue";
import NotFound from "./pages/NotFound.vue";
import ExploreAlternatives from "./pages/Explore.vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import VueCookies from "vue-cookies";

const routes = {
  "/": Home,
  "/explore": ExploreAlternatives,
};

Vue.use(VueCookies);
Vue.$cookies.config("30d");

new Vue({
  el: "#app",
  data: {
    currentRoute: window.location.pathname,
  },
  components: {
    PulseLoader,
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
