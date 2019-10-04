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
      apiKey: 'AIzaSyAQ8RrLrDyFAG_VafCG5rQ633kUzFVUsus',
      authDomain: 'collection-1dd44.firebaseapp.com',
      databaseURL: 'https://collection-1dd44.firebaseio.com',
      projectId: 'collection-1dd44',
      storageBucket: 'collection-1dd44.appspot.com'
    })
    this.$store.dispatch('loadItems')
  }
}).$mount('#app')
