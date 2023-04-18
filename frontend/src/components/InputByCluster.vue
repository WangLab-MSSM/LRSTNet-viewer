<template>
  <div class="input-by-cluster">
    <div class="header-menu">
      <div>
        <v-swatches 
          v-model="color" 
          swatches='text-advanced' 
          :trigger-style="{ width: '12px', height: '12px', borderRadius: '1px', padding: '4px' }"
        >
        </v-swatches>
        {{ cluster }}
      </div>
      <div class="header-menu-options">
        <a @click="updateClusterVisibility">
          <b-icon :icon="show ? 'eye' : 'eye-off'"></b-icon>
        </a>
      </div>
    </div>
    <div class="gene-selection" v-if="showGeneClusters">
          <b-field>
              <b-select placeholder="Gene" v-model="clusterGene">
                  <option
                      v-for="gene in genes"
                      :value="gene"
                      :key="gene"
                  >
                      {{ gene}}
                  </option>
              </b-select>
        </b-field>
      </div>
  </div>
</template>

<script>
import VSwatches from 'vue-swatches'

export default {
    name: "input-by-cluster",
    props: ['cluster', 'show'],
    components: {
      VSwatches,
    },
    computed: {
      clusterGene: {
        get() { return this.$store.state.clusters[this.cluster].gene },
        set(gene) { this.$store.dispatch('setClusterGene', { gene, cluster: this.cluster} ) },
      },
      color: {
        get() { return this.$store.state.clusters[this.cluster].color },
        set(c) { this.$store.dispatch('setClusterColor', { color: c, cluster: this.cluster })}
      },
      genes() { return this.$store.state.genes },
      showGeneClusters() { return this.$store.state.showGeneClusters },
    },
    methods: {
      updateClusterVisibility() {
        this.$store.dispatch('updateClusterVisibility', { cluster: this.cluster })
      }
    },
}
</script>

<style>
.input-by-cluster {
  border: solid 1px #000000;
  margin: 10px auto;
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.header-menu {
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 2px;
  width: 100%;
  font-weight: bold;
}
</style>