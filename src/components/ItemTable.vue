<template>
  <div class="item-list">
    <div class="search-wrapper">
      <input type="text" v-model="search" placeholder="Search title.."/>
      <label>Search title:</label>
    </div>
    <b-table striped hover :items="items" :fields="fields" head-variant="dark" outlined="outlined">
      <template slot="itemName" slot-scope="data">
        <router-link :to="`/items/${data.item.id}`">
          {{ data.item.itemName }}
        </router-link>
      </template>
      <template slot="index" slot-scope="data">
        <div class="action-wrapper">
          <div>
            <router-link :to="`/items/${data.item.id}`" tag="button">
              <img src="../assets/svg/eye.svg"/>
            </router-link>
          </div>
          <app-edit-item-details-modal :item="data.item"></app-edit-item-details-modal>
          <app-delete-item :item="data.item"></app-delete-item>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: '',
      fields: {
        itemName: {
          label: 'Item'
        },
        grade: {
          label: 'Grade'
        },
        issuedDate: {
          label: 'Issued date'
        },
        purchasedPrice: {
          label: 'Purchased price'
        },
        purchasedDate: {
          label: 'Purchased date'
        },
        index: {
          label: ''
        }
      }
    }
  },
  props: ['id'],
  computed: {
    items () {
      return this.$store.getters.loadedItems.filter((data) => {
        return this.$store.getters.loadedItem(data.id).itemName.toLowerCase().includes(this.search.toLowerCase())
      })
    },
    item () {
      return this.$store.getters.loadedItem(this.id)
    }
  }
}
</script>
