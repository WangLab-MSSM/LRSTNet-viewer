<template>
  <div class="input-by-cluster-container">
      <div class="input-content">
        <b-field>
            <b-switch 
                v-model="showGeneClusters"
            >
                {{ showGeneClusters ? "Show clusters only" : "Show gene expression by cluster" }}
            </b-switch>
        </b-field>
            <input-by-cluster 
                v-for="o, cluster in clusters"
                :key="cluster"
                :cluster="cluster"
                :show="o.show"
            />
      </div>
    </div>
</template>

<script>
import InputByCluster from './InputByCluster.vue'

export default {
    components: {
        InputByCluster
    },
    computed: {
        showGeneClusters: {
            get() { return this.$store.state.showGeneClusters },
            set(v) { this.$store.dispatch('showGeneClusters', { showGeneClusters: v }) }
        },
        clusters() { return this.$store.state.clusters },
    },
}
</script>

<style>
.input-content {
    margin: 10px;
    font-size: 0.9em;
}
</style>