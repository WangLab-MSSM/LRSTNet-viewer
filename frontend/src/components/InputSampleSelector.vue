<template>
  <div class="input-sample-selector">
    <b-field label="Sample" horizontal>
      <b-select
        v-model="selectedSample"
      >
          <option
              v-for="sample in samples"
              :value="sample"
              :key="sample"
            >
              A{{ sample }}
          </option>
      </b-select>
    </b-field>
  </div>
</template>

<script>
export default {
  name: "input-sample-selector",
  computed: {
    samples() { return this.$store.state.samples },
    selectedSample: {
      get() { return this.$store.state.selectedSample },
      set(selectedSample) { 
        this.$store.dispatch('fetchSampleMeta', { selectedSample }) 
      },
    },
  },
}
</script>

<style>
.input-sample-selector {
  margin-bottom: 8px;
}
</style>