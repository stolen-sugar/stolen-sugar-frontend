<template>
  <div>
    <div class="columns is-multiline is-centered">
      <div
        class="column is-narrow"
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
      // this.group.map(function name(item) {
      //   return item.alternatives;
      // });

      // let groups = Object.values(this.list);

      console.log(Object.values(this.list));
      console.log("hit groups");

      return Object.values(this.list).sort(function name(a, b) {
        return b.length - a.length;
      });
    },
  },
};
</script>

<style></style>
