<template>
  <div>
    <h1>{{ item.itemName }}</h1>
    <p>Item Type: {{ item.type }}</p>
    <p>Item Condition: {{ item.grade }}</p>
    <p>Issued Country: {{ item.issuedCountry }}</p>
    <p>Purchased Date: {{ item.purchasedDate }}</p>
    <p>Purchased Price: {{ item.purchasedPrice }}</p>
    <p>Item Series: {{ item.series }}</p>
    <app-edit-item-details-modal :item="item"></app-edit-item-details-modal>
    <app-delete-item :item="item"></app-delete-item>
  </div>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    item () {
      return this.$store.getters.loadedItem(this.id)
    }
  }
}
</script>
