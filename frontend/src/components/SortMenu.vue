<template>
  <div class="sort-menu">
      <section class="sort-menu-collapsible">
        <!-- <b-collapse 
            animation="slide" 
        >
            <template #trigger="props">
                <div
                    class="card-header"
                    role="button"
                    aria-controls="contentIdForA11y3">
                    <p class="card-header-title">
                        Heatmap options
                    </p>
                    <a class="card-header-icon">
                        <b-icon
                            :icon="props.open ? 'menu-down' : 'menu-up'">
                        </b-icon>
                    </a>
                </div>
            </template> -->

          <div class="card-content">
                <div v-if="selectedSeries.length === 0">
                    Click element on heatmap to enable sorting.
                </div>
                <div v-else>
                    Sort heatmap by: <b>{{ selectedSeries }}</b>
                <div class="sort-buttons-buttons">
                    <b-button
                            size="is-small"
                            rounded type="is-warning"
                            :disabled="selectedSeries.length === 0"
                            icon-left="arrow-up"
                            @click="sortBySeries(asc=true)"
                        >
                            Asc
                    </b-button>
                    <b-button
                            size="is-small"
                            rounded type="is-warning"
                            :disabled="selectedSeries.length === 0"
                            icon-left="arrow-down"
                            @click="sortBySeries(asc=false)"
                        >
                        Desc
                    </b-button>
                    </div>
                </div>
            </div>
        <!-- </b-collapse> -->
    </section>
  </div>
</template>

<script>
export default {
    computed: {
        selectedSeries() {
            return this.$store.state.selectedSeries
        },
    },
    methods: {
        sortBySeries(asc) {
            this.$store.dispatch('sortBySeries', { series: this.selectedSeries, asc })
        }
    }
}
</script>

<style>
    .sort-menu {
        /* margin: 10px 5px; */
        /* padding: 5px; */
        background: '#ffffff';
        /* background: pink; */
    }

    .sort-buttons {
        padding: 10px;
        background: #fafafa;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 10px;
    }

    .sort-buttons-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
    }

    .card-content {
        text-align: center;
    }

</style>