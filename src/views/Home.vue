<template>
  <div class="home-view-container">
    <h4>Your Collection - Dashboard</h4>
    <h4>Total banknotes: {{ getAllBanknotes.length }}</h4>
    <h4>Total coins: {{ getAllCoins.length }}</h4>
    <h4>Total number of all the items in your collection: {{ itemCount }}</h4>

    <button @click="toggleItemForm" class="btn btn-primary">Add New Item</button>

    <b-container fluid>
      <b-container class="col-sm-8">
        <b-form @submit.prevent="handleSubmit" @reset="onReset" v-if="showItemForm">
          <b-form-group id="input-group-1">
            <b-row>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="item_name">Item name:</label>
                  <b-form-input
                          id="item_name"
                          v-model="formData.itemName"
                          type="text"
                          placeholder="e.g., Ceylon one rupee"
                  ></b-form-input>
                  <label for="issued_date" v-show="formData.type === 'banknotes'">Issued date:</label>
                  <b-form-input
                          id="issued_date"
                          v-model="formData.issuedDate"
                          type="date"
                          placeholder="e.g., 23/07/2018"
                          v-show="formData.type === 'banknotes'"
                  ></b-form-input>
                  <label for="issued_date" v-show="formData.type === 'coins'">Issued year:</label>
                  <b-form-select
                          id="issued_date"
                          :options="years"
                          v-model="formData.issuedDate"
                          v-show="formData.type === 'coins'"
                  ></b-form-select>
                </b-form-row>
                <b-form-row>
                  <label for="purchased_date">Purchased date:</label>
                  <b-form-input
                          id="purchased_date"
                          v-model="formData.purchasedDate"
                          type="date"
                          placeholder="e.g., 23/07/2018"
                  ></b-form-input>
                  <label for="purchased_price">Purchased price:</label>
                  <b-form-input
                          id="purchased_price"
                          v-model="formData.purchasedPrice"
                          type="number"
                          placeholder="e.g., 10000"
                  ></b-form-input>
                </b-form-row>
              </b-col>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="type">Item type:</label>
                  <b-form-select
                          id="type"
                          :options="types"
                          v-model="formData.type"
                  ></b-form-select>
                  <label for="grade">Item condition:</label>
                  <b-form-select
                          id="grade"
                          v-model="formData.grade"
                          :options="grades"
                  ></b-form-select>
                  <label for="issued_country">Issued country:</label>
                  <country-select
                          v-model="formData.issuedCountry"
                          topCountry="LK"
                          class="custom-select"/>
                </b-form-row>
              </b-col>
            </b-row>
          </b-form-group>
          <a v-on:click="showMore = !showMore" class="btn btn-link"><span>{{ showMore ? '-' : '+' }}</span> Advanced Information</a>
          <b-form-group id="input-group-2" class="advanced-data" v-if="showMore">
            <b-row>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="item_serial" v-show="formData.type === 'banknotes'">Serial number:</label>
                  <b-form-input
                          id="item_serial"
                          v-model="formData.itemSerial"
                          type="text"
                          placeholder="e.g., AA000001"
                          v-show="formData.type === 'banknotes'"
                  ></b-form-input>
                  <label for="item_series">Series:</label>
                  <b-form-input
                          id="item_series"
                          v-model="formData.series"
                          type="text"
                          placeholder="e.g., Flora and fauna"
                  ></b-form-input>
                </b-form-row>
              </b-col>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="issued_bank" v-show="formData.type === 'banknotes' || formData.type === 'stamps'">Issued bank/authority:</label>
                  <b-form-input
                          id="issued_bank"
                          v-model="formData.issuedBank"
                          type="text"
                          placeholder="e.g., Reserve Bank of Australia"
                          v-show="formData.type === 'banknotes' || formData.type === 'stamps'"
                  ></b-form-input>
                </b-form-row>
              </b-col>
            </b-row>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-button type="submit" variant="primary">Save item</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form-group>
        </b-form>
      </b-container>
    </b-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BFormRow from 'bootstrap-vue/src/components/layout/form-row'

export default {
  name: 'home',
  components: { BFormRow },
  data() {
    return {
      showMore: false,
      showItemForm: false,
      formData: {
        itemName: '',
        issuedCountry: 0,
        type: null,
        grade: '',
        issuedBank: '',
        issuedDate: '',
        itemSerial: '',
        series: '',
        purchasedDate: '',
        purchasedPrice: ''
      },
      grades: [{ text: 'Select the item condition', value: null }, 'Uncirculated', 'About Uncirculated', 'Extremely Fine', 'Very Fine', 'Fine', 'Very Good', 'Fair', 'Poor'],
      types: [{ text: 'Select the item type', value: null }, 'banknotes', 'coins', 'stamps'],
      coin_grades: [{ text: 'Select the item condition', value: null }, 'Mint State (MS-65 to 70)', 'Mint State (MS-60 to 64)', 'About Uncirculated (AU-50)', 'Extremely Fine (EF-40, or XF-40)', 'Very Fine (VF-30)', 'Fine (F-12)', 'Very Good (VG-8)', 'Good (G-4)']

    }
  },
  computed: {
    ...mapGetters([
      'itemCount',
      'getAllBanknotes',
      'getAllCoins'
    ]),
    years () {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1699 }, (value, index) => 1700 + index)
    }
  },
  methods: {
    ...mapActions([
      'addItem'
    ]),
    toggleItemForm() {
      this.showItemForm = !this.showItemForm
    },
    handleSubmit() {
      const {
        type,
        issuedCountry,
        itemName,
        grade,
        issuedBank,
        issuedDate,
        itemSerial,
        series,
        purchasedDate,
        purchasedPrice
      } = this.formData

      const payload = {
        type,
        item: {
          itemName,
          issuedCountry,
          type,
          grade,
          issuedBank,
          issuedDate,
          itemSerial,
          series,
          purchasedDate,
          purchasedPrice
        }
      }
      this.addItem(payload)

      // reset form after submit
      this.formData = {
        itemName: '',
        issuedCountry: 0,
        type: null
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
    }
  }
}
</script>
