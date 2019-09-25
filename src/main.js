import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vueCountryRegionSelect from 'vue-country-region-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/sass/index.sass'

import App from './App.vue'
import * as firebase from 'firebase'
import router from './router'
import store from './store'
import AddItem from './components/Add/AddItem.vue'
import EditItemDetailsModal from './components/Edit/EditItemDetailsModal.vue'
import DeleteItem from './components/Delete/DeleteItem.vue'

Vue.use(BootstrapVue)
Vue.use(vueCountryRegionSelect)

Vue.config.productionTip = false

Vue.component('app-add-item', AddItem)
Vue.component('app-edit-item-details-modal', EditItemDetailsModal)
Vue.component('app-delete-item', DeleteItem)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'xxxxxxxxxxx',
      authDomain: 'xxxxxxxxxx',
      databaseURL: 'xxxxxxxxxx',
      projectId: 'xxxxxxx',
      storageBucket: 'xxxxxxx'
    })
    this.$store.dispatch('loadItems')
  }
}).$mount('#app')
