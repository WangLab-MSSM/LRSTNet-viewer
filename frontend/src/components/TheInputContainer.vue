<template>
  <div class="input-container">
    <input-sample-selector />    
      <input-genes />
      <sort-menu />
      <input-by-cluster-container />
  </div>
</template>

<script>
import InputByClusterContainer from './InputByClusterContainer.vue'
import InputSampleSelector from './InputSampleSelector.vue'
import InputGenes from './InputGenes.vue'
import SortMenu from './SortMenu.vue'

export default {
    components: {
      InputByClusterContainer,
      InputGenes,
      InputSampleSelector,
      SortMenu,
    },
}
</script>

<style>
.input-container {
  width: 320px;
  border: solid 1px #c0bdbd;
  padding: 20px;
  margin: 8px;
}

</style>