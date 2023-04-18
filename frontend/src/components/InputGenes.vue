<template>
  <div class="input-genes">
        <b-field label="Input newline separated genes (max 10)">
            <b-input 
                v-model="genes" 
                type="textarea">
            </b-input>
        </b-field>
        <b v-if="notFound.length > 0">Not found:</b> {{ notFound.join(', ') }}
        <b-button 
            expanded 
            rounded 
            type="is-primary" 
            @click="submitGenes"
            :disabled="found.length > 10"
        >
            {{ valid ? "Submit" : `Select fewer genes (Entered: ${found.length})` }}
        </b-button>
  </div>
</template>

<script>
import available from '../refs/available'

export default {
    name: "input-genes",
    data() {
        return {
            genes: '',
        }
    },
    computed: {
        landingGenes() {
            return this.$store.state.genes
        },
        found() {
            return this.genes.split('\n').filter(gene => available[gene.toUpperCase()])
        },
        notFound() {
            if (this.genes.length <= 0) {
                return []
            }
            return this.genes.split('\n').filter(gene => !available[gene.toUpperCase()])
        },
        valid() { return this.found.length <= 10 },
    },
    methods: {
        submitGenes() {
            this.$store.dispatch('submitGenes', { genes: this.found.map(gene => gene.toUpperCase()) })
        }
    },
    mounted() {
        this.genes = this.landingGenes.join('\n')
        this.$store.dispatch('submitGenes', { genes: this.landingGenes })
    }
}
</script>

<style>
.input-genes {
    width: 100%;
    word-break: break-all;
}
</style>