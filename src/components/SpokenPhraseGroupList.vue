<template>
  <div>
    <div class="columns is-multiline is-centered has-text-centered">
      <div
        class="column is-one-third-desktop is-half"
        v-for="(key, index) in formattedGroups"
        :key="index"
      >
        <SpokenPhraseGroup :group="key"> </SpokenPhraseGroup>
      </div>
    </div>
  </div>
</template>

<script>
import SpokenPhraseGroup from "./SpokenPhraseGroup.vue";
export default {
  name: "SpokenPhraseGroupList",
  props: {
    list: Object,
  },
  components: {
    SpokenPhraseGroup,
  },
  computed: {
    formattedGroups: function () {
      return Object.values(this.list).sort(function name(a, b) {
        return b.length - a.length;
      });
    },
  },
};
</script>

<style></style>
