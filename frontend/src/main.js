import Vue from 'vue'
import App from './App.vue'
import store from './store'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import 'vue-swatches/dist/vue-swatches.css'

Vue.config.productionTip = false
Vue.use(Buefy)

// Vue.use(VSwatches, { componentName: 'v-swatches' })

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
