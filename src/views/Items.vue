<template>
  <div>
    <ItemTable/>
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
      'loadedItems'
    ])
  }
}
</script>
