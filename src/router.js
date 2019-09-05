import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Banknotes from './views/Banknotes.vue'
import Coins from './views/Coins.vue'
import Item from './views/Item.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/banknotes',
      name: 'banknotes',
      component: Banknotes
    },
    {
      path: '/coins',
      name: 'coins',
      component: Coins
    },
    {
      path: '/items/:type/:id',
      name: 'item',
      component: Item
    }
  ]
})
