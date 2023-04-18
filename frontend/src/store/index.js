import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import { getExpression, getSampleMeta } from '../firebase'

import sortFn from '../sortFn'
import barcodes from '../refs/barcodes'

export default new Vuex.Store({
  state: {
    barcodes: deepClone(barcodes),
    clusters: {
      'tumor cells': {
        show: true,
        color: '#ff0000',
        gene: null,
      }, 
      'tumor stroma mix': {
        show: true,
        color: '#fa03d7',
        gene: null,
      }, 
      'tumor stroma immune mix': {
        show: true,
        color: '#9900ff',
        gene: null,
      }, 
      'stroma close to tumor': {
        show: true,
        color: '#2eff8d',
        gene: null,
      }, 
      'stroma far from tumor': {
        show: true,
        color: '#00ffff',
        gene: null,
      }, 
      'adipocytes': {
        show: true,
        color: '#fdff00',
        gene: null,
      }, 
    },
    expression: [],
    genes: [
      'KRT8', 
      'EPCAM', 
      'MUC16', 
      'ACTA2', 
      'FAP', 
      'MFAP5', 
      'LRP1', 
      'PSAP', 
      'PDGFRA', 
      'PDGFRB'
    ],
    // genes: [
    //     'MUC16',
    //     'CPT1A',
    //     'KIF2C', 
    //     'PPP6R1',
    // ],
    sampleMeta: {},
    samples: ['4', '5', '10', '12'],
    selectedSample: '4',
    selectedSeries: '',
    showGeneClusters: false,
  },
  mutations: {
    SET_BARCODES(state, { barcodes }) {
      state.barcodes = barcodes
    },
    SET_CLUSTER_COLOR(state, { color, cluster }) {
      let updatedCluster = deepClone(state.clusters[cluster])
      updatedCluster.color = color
      state.clusters = {
        ...deepClone(state.clusters),
        [cluster]: updatedCluster,
      }
    },
    SET_CLUSTER_GENE(state, { gene, cluster }) {
      let updatedCluster = deepClone(state.clusters[cluster])
      updatedCluster.gene = gene
      state.clusters = {
        ...deepClone(state.clusters),
        [cluster]: updatedCluster,
      }
    },
    SET_EXPRESSION(state, { expression }) {
      state.expression = expression
    },
    SET_GENES(state, { genes }) {
      state.genes = genes
    },
    SET_SAMPLE_META(state, { sampleMeta }) {
      state.sampleMeta = sampleMeta
    },
    SET_SELECTED_SAMPLE(state, { selectedSample }) {
      state.selectedSample = selectedSample
    },
    SET_SELECTED_SERIES(state, { selectedSeries }) {
      state.selectedSeries = selectedSeries
    },
    SET_SHOW_GENE_CLUSTERS(state, { showGeneClusters }) {
      state.showGeneClusters = showGeneClusters
    },
    UPDATE_CLUSTER_VISIBILITY(state, { cluster }) {
      let updatedCluster = deepClone(state.clusters[cluster])
      updatedCluster.show = !updatedCluster.show
      state.clusters = {
        ...deepClone(state.clusters),
        [cluster]: updatedCluster,
      }
    },
  },
  actions: {
    async fetchSampleMeta(store, { selectedSample }) {
      const sampleMeta = await getSampleMeta(selectedSample)
      store.commit('SET_SAMPLE_META', { sampleMeta }) 
      store.commit('SET_SELECTED_SAMPLE', { selectedSample }) 
    },
    async submitGenes(store, { genes }) {
      const expressionPromises = genes.map((gene) => {
        return getExpression({
          gene,
          sample: store.state.selectedSample,
        })
      })
      const expression = await Promise.all(expressionPromises)
      store.commit('SET_EXPRESSION', { expression })
      store.commit('SET_GENES', { genes })
    },
    setClusterColor(store, { color, cluster }) {
      store.commit('SET_CLUSTER_COLOR', { color, cluster })
    },
    setClusterGene(store, { gene, cluster }) {
      store.commit('SET_CLUSTER_GENE', { gene, cluster })
    },
    setSelectedSeries(store, { selectedSeries }) {
      store.commit('SET_SELECTED_SERIES', { selectedSeries }) 
    },
    showGeneClusters(store, { showGeneClusters }) {
      store.commit('SET_SHOW_GENE_CLUSTERS', { showGeneClusters })
    },
    sortBySeries(store, { series, asc }) {
      let data = {}
      const expressionObj = Object.fromEntries(store.state.expression)
      if (series in expressionObj) {
        data = expressionObj[series]
      } else {
        const categoryVals = Object.fromEntries(
          Object.keys(store.state.clusters).map((cluster, i) => [cluster, i+1]))
        data = Object.fromEntries(
            Object.entries(store.state.sampleMeta)
              .filter(([, o]) => o.cluster)
              .map(([barcode, o]) => [barcode, categoryVals[o.cluster]])
        )
      }
      const sorted = sortFn({
        data,
        asc
      })
      store.commit('SET_BARCODES', { barcodes: sorted }) 
      console.log('sorted? ', sorted)
    },
    updateClusterVisibility(store, { cluster }) {
      store.commit('UPDATE_CLUSTER_VISIBILITY', { cluster }) 
    },
  },
})

function deepClone(o) {
  return JSON.parse(JSON.stringify(o))
}