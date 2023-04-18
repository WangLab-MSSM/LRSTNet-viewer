<template>
    <div class="bubblechart">
      <div id="he-scatterplot"></div>
      
      <div class="bubblechart-options">
        <div class="slider-opacity">
          <div class="expression-dots" v-if="showGeneClusters">
            Expression
            <span class="dot-max"></span>Max
            <span class="dot-min"></span>Min
          </div>
          <b-field label="H&E opacity" horizontal>
            <b-slider :min="1" :max="100" size="is-small" v-model="backgroundOpacity" lazy>
            </b-slider>
          </b-field>
          <b-field label="Graph opacity" horizontal>
            <b-slider type="is-warning" :min="1" :max="100" size="is-small" v-model="graphOpacity" lazy>
            </b-slider>
          </b-field>
        <!-- </div> -->
        <!-- <div class="bubblechart-legend"> -->
        </div>
      </div>
  </div>
</template>

<script>
import { generateBubbleChartByCluster } from '../plotly/cluster_bubblechart'

export default {
  data() {
    return {
      backgroundOpacity: 50,
      graphOpacity: 90,
    }
  },
  computed: {
    showGeneClusters() { return this.$store.state.showGeneClusters },
    clusters() { return this.$store.state.clusters },
    expression() { return this.$store.state.expression },
    sample() { return this.$store.state.selectedSample },
    sampleMeta() { return this.$store.state.sampleMeta },
  },
  watch: {
      backgroundOpacity() { this.drawBubbleChart() },
      clusters() { this.drawBubbleChart() },
      expression() { this.drawBubbleChart() },
      graphOpacity() { this.drawBubbleChart() },
      sample() { this.drawBubbleChart() },
      sampleMeta() { this.drawBubbleChart() },
      showGeneClusters() { this.drawBubbleChart() },
  },
  methods: {
      drawBubbleChart() {
          generateBubbleChartByCluster({
              backgroundOpacity: this.backgroundOpacity,
              clusters: this.clusters,
              expression: this.expression,
              graphOpacity: this.graphOpacity,
              sample: this.sample,
              sampleMeta: this.sampleMeta,
              showGeneClusters: this.showGeneClusters,
          })
      }
  },
  mounted() { this.drawBubbleChart() },
}
</script>

<style>

.bubblechart-options {
  margin-left: 50px;
  /* margin: 0 auto; */
}

.slider-opacity {
  display: flex;
  flex-direction: column;
  width: 50%;
  font-size: small;
}

.bubblechart-legend {
  margin-left: 10px;
}

.expression-dots {
  margin-top: 10px;
  margin-bottom: 20px;
}

.dot-max {
  height: 20px;
  width: 20px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-left: 10px;
}

.dot-med {
  height: 10px;
  width: 10px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-left: 10px;
}

.dot-min {
  height: 6px;
  width: 6px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  margin-left: 10px;
}
</style>