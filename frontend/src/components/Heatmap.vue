<template>
    <div class="heatmap">
      <div id="plotly-heatmap"></div>
    </div>
</template>

<script>
import { generateHeatmap } from '../plotly/heatmap'

let plot;

export default {
  components: {
    },
    name: "heatmap",
    computed: {
        barcodes() { return this.$store.state.barcodes },
        clusters() { return this.$store.state.clusters },
        expression() { return this.$store.state.expression },
        sampleMeta() { return this.$store.state.sampleMeta },
    },
    watch: {
        barcodes() { this.drawHeatmap() },
        clusters() { this.drawHeatmap() },
        expression() { this.drawHeatmap() },
        sampleMeta() { this.drawHeatmap() },
        showGeneClusters() { this.drawHeatmap() },
    },
    methods: {
        drawHeatmap() {
            plot = generateHeatmap({
              barcodes: this.barcodes,
              clusters: this.clusters,
              expression: this.expression,
              sampleMeta: this.sampleMeta,
            })
            if (plot) {
                plot.on('plotly_click', (data) => {
                    const point = data.points[0]
                    console.log('click!')
                    this.$store.dispatch(
                    'setSelectedSeries',
                    {
                        selectedSeries: point.y, 
                    }
                    )
                })
            }
        }
    },
    mounted() {
        this.drawHeatmap()
    },
}
</script>

<style>

</style>