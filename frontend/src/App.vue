<template>
  <div id="app">
    <div class="nav">
      <input-container />
    </div>
    <div class="main">
      <bubblechart />
      <heatmap />
    </div>
  </div>
</template>

<script>
import Bubblechart from './components/Bubblechart.vue'
import Heatmap from './components/Heatmap.vue'
import InputContainer from './components/TheInputContainer.vue'

export default {
  name: 'App',
  components: {
    Bubblechart,
    Heatmap,
    InputContainer,
  },
  computed: {
    selectedSample() { return this.$store.state.selectedSample }
  },
  mounted() {
    this.$store.dispatch('fetchSampleMeta', { selectedSample: this.selectedSample }) 
  },
}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: 0 auto;
}

.main {
  display: flex;
  flex-direction: row;
  width: 80%;
  padding: 0px;
  margin-right: 200px;
}

.slider-opacity {
  width: 50%;
  margin-left: 30px;
}
</style>
