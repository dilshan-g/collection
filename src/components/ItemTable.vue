<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template slot="itemName" slot-scope="data">
        <router-link :to="`/items/${data.item.id}`">
          {{ data.item.itemName }}
        </router-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fields: {
        itemName: {
          label: 'Item'
        },
        grade: {
          label: 'Grade'
        },
        issuedDate: {
          label: 'Issued Date'
        },
        purchasedPrice: {
          label: 'Purchased Price'
        },
        purchasedDate: {
          label: 'Purchased Date'
        }
      }
    }
  },
  computed: {
    items () {
      return this.$store.getters.loadedItems
    }
  }
}
</script>
