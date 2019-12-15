<template>
  <div class="home-view-container">
    <b-container class="home-view-container__main" fluid>
      <b-row class="items-charts">
        <b-col sm="6">
          <span class="chart-label">Items by Category</span>
          <pie-chart :data="itemCountChartData"></pie-chart>
        </b-col>
        <b-col sm="6">
          <span class="chart-label">Items by Value</span>
          <pie-chart :data="itemValueChartData"></pie-chart>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BCol from 'bootstrap-vue/src/components/layout/col'
export default {
  components: { BCol },
  data() {
    return {
      itemCountChartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Banknotes', 'Coins', 'Stamps'],
        datasets: [
          {
            backgroundColor: ['#000080', '#2B3856', '#82CAFF'],
            data: [this.itemCount('banknotes'), this.itemCount('coins'), this.itemCount('stamp')]
          }
        ]
      },
      itemValueChartData: {
        hoverBackgroundColor: 'red',
        hoverBorderWidth: 10,
        labels: ['Banknotes', 'Coins', 'Stamps'],
        datasets: [
          {
            backgroundColor: ['#000080', '#2B3856', '#82CAFF'],
            data: [this.getItemValueCount('banknotes'), this.getItemValueCount('coins'), this.getItemValueCount('stamp')]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'getItemsCount',
      'getItemsValueCount'
    ])
  },
  methods: {
    itemCount (param) {
      return this.$store.getters.getItemsCount(param)
    },
    getItemValueCount(param) {
      let count = 0
      this.$store.getters.getItemsValueCount(param).map((value, index) => {
        count += parseInt(value.purchasedPrice)
      })
      return count
    }
  }
}
</script>
