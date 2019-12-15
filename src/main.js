import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vueCountryRegionSelect from 'vue-country-region-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/index.scss'

import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import AddItem from './components/Add/AddItem.vue'
import EditItemDetailsModal from './components/Edit/EditItemDetailsModal.vue'
import DeleteItem from './components/Delete/DeleteItem.vue'
import PieChart from './components/Charts/PieChart.vue'
import Settings from './components/Settings/Settings'

Vue.use(BootstrapVue)
Vue.use(vueCountryRegionSelect)

Vue.config.productionTip = false

Vue.component('app-add-item', AddItem)
Vue.component('app-edit-item-details-modal', EditItemDetailsModal)
Vue.component('app-delete-item', DeleteItem)
Vue.component('pie-chart', PieChart)
Vue.component('personal-settings', Settings)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: '',
      authDomain: '',
      databaseURL: '',
      projectId: '',
      storageBucket: ''
    })
    this.$store.dispatch('loadItems')
    this.$store.dispatch('loadSettings')
  }
}).$mount('#app')
