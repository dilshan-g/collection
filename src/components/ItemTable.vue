<template>
  <div class="item-list">
    <div class="loader d-flex justify-content-center" v-if="loading">
      <b-spinner style="width: 3rem; height: 3rem;" variant="danger"></b-spinner>
    </div>
    <div v-if="!loading">
      <b-container class="search-wrapper">
        <b-row>
          <h3>Search:</h3>
          <b-col>
            <b-form-input type="search" v-model="search_name" placeholder="Search name.."></b-form-input>
          </b-col>
          <b-col>
            <b-form-select type="select" :options="types" v-model="search_type"></b-form-select>
          </b-col>
          <b-col>
            <country-select id="issuedCountry" v-model="search_country" topCountry="LK" class="custom-select"></country-select>
          </b-col>
        </b-row>
      </b-container>
      <b-table striped hover responsive :items="items" :fields="fields" head-variant="dark" outlined="outlined" v-if="items.length > 0">
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
      <div class="search-alert__not-found" v-if="items.length === 0">
        <b-alert show variant="info">
          <h4 class="alert-heading">Could not find the item you looking for ?</h4>
          <p>
            Click <router-link to="/add">here</router-link> to add a new item.
          </p>
        </b-alert>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BCol from 'bootstrap-vue/src/components/layout/col'
export default {
  components: { BCol },
  data () {
    return {
      search_name: '',
      search_type: null,
      search_country: null,
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
      },
      types: [{ text: 'Select the item type', value: null }, 'banknotes', 'coins', 'stamps']
    }
  },
  props: ['id'],
  computed: {
    ...mapGetters([
      'loadedItems',
      'loadedItem'
    ]),
    items () {
      return getByCountry(getByCategory(getByKeyword(this.loadedItems, this.search_name), this.search_type), this.search_country)
    },
    item () {
      return this.loadedItem(this.id)
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}

function getByKeyword(list, keyword) {
  const search = keyword.trim().toLowerCase()
  if (!search.length) return list
  return list.filter(item => item.itemName.toLowerCase().indexOf(search) > -1 ||
    (item.series.toLowerCase().indexOf(search) > -1) || item.grade.toLowerCase().indexOf(search) > -1)
}

function getByCategory(list, category) {
  if (!category) return list
  return list.filter(item => item.type === category)
}

function getByCountry(list, country) {
  if (!country) return list
  return list.filter(item => item.issuedCountry === country)
}
</script>
