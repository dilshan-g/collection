<script>
import { VueCharts } from 'vue-chartjs'
export default {
  extends: VueCharts.Doughnut,
  // mixins: [VueCharts.mixins.reactiveProp],
  props: ['data', 'options'],
  mounted() {
    this.renderChart(this.data)
  }
}
</script>
