<template>
  <div>
    <div class="box">
      <div class="hero-body">
        <p class="title has-text-centered">{{ group[0].context }}</p>
        <p class="subtitle has-text-centered">
          {{ group.length }} spoken phrases
        </p>
      </div>
      <table class="table is-fullwidth is-striped is-narrow">
        <thead>
          <tr>
            <th>action</th>
            <th>spoken form</th>
            <th>alternatives</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th>action</th>
            <th>spoken form</th>
            <th>alternatives</th>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="(info, index) in group" :key="index">
            <td>
              {{ info.action }}
            </td>
            <td>
              {{ info.defaultName }}
            </td>
            <td>
              {{ groupKeys[index].join(", ") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpokenPhraseGroup",
  props: {
    group: Array,
  },
  computed: {
    groupKeys: function () {
      return this.group.map(function name(item) {
        return item.alternatives;
      });
    },
  },
};
</script>

<style></style>
