<template>
  <div>
    <h1>{{ item.itemName }} ({{ $route.params.type }})</h1>
    <p>Issued Country: {{ item.issuedCountry }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      item: {}
    }
  },
  computed: {
    ...mapState([
      'banknotes',
      'coins'
    ])
  },
  mounted() {
    const item = this[this.$route.params.type][this.$route.params.id]
    this.item = item
  }
}
</script>
