<template>
  <div>
    <h1>{{ category }}s in your collection</h1>
    <b-table striped hover :items="items" :fields="fields">
      <template slot="itemName" slot-scope="data">
        <router-link :to="`/items/${category}/${data.index}`">
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
  props: {
    category: String,
    items: Array
  }
}
</script>
