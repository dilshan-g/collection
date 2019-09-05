<template>
  <div>
    <ItemTable
      category="coins"
      :items="coins"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ItemTable from '@/components/ItemTable.vue'

export default {
  components: {
    ItemTable
  },
  data() {
    return {}
  },
  computed: {
    ...mapState([
      'coins'
    ])
  }
}
</script>
