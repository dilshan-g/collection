<template>
  <div>
    <h1>{{ species }} for Adoption</h1>
    <b-table striped hover :items="pets" :fields="fields">
      <template slot="name" slot-scope="data">
        <router-link :to="`/pets/${species}/${data.index}`">
          {{ data.index }}
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
        item_name: {
          label: 'Item'
        },
        grade: {
          label: 'Grade'
        },
        issued_date: {
          label: 'Issued Date'
        },
        purchased_price: {
          label: 'Purchased Price'
        },
        purchased_date: {
          label: 'Purchased Date'
        }
      }
    }
  },
  props: {
    species: String,
    pets: Array
  }
}
</script>
