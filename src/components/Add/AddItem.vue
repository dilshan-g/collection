<template>
    <b-container fluid>
        <b-container class="col-sm-8">
            <b-form @submit.prevent="handleSubmit" @reset="onReset">
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
                                <label for="issuedCountry">Issued country:</label>
                                <country-select
                                        id="issuedCountry"
                                        v-model="formData.issuedCountry"
                                        topCountry="LK"
                                        class="custom-select"
                                ></country-select>
                            </b-form-row>
                        </b-col>
                    </b-row>
                </b-form-group>
                <b-form-group id="input-group-2" class="advanced-data">
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
                    <b-button type="submit" class="btn btn-primary">Save item</b-button>
                    <b-button type="reset" class="btn btn-warning">Reset</b-button>
                </b-form-group>
            </b-form>
        </b-container>
    </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BFormRow from 'bootstrap-vue/src/components/layout/form-row'

export default {
  name: 'home',
  components: { BFormRow },
  data() {
    return {
      formData: {
        itemName: '',
        issuedCountry: null,
        type: null,
        grade: null,
        issuedBank: '',
        issuedDate: '',
        itemSerial: '',
        series: '',
        purchasedDate: '',
        purchasedPrice: '',
        itemImage: null
      },
      grades: [{ text: 'Select the item condition', value: null }, 'Uncirculated', 'About Uncirculated', 'Extremely Fine', 'Very Fine', 'Fine', 'Very Good', 'Fair', 'Poor'],
      types: [{ text: 'Select the item type', value: null }, 'banknotes', 'coins', 'stamps'],
      coin_grades: [{ text: 'Select the item condition', value: null }, 'Mint State (MS-65 to 70)', 'Mint State (MS-60 to 64)', 'About Uncirculated (AU-50)', 'Extremely Fine (EF-40, or XF-40)', 'Very Fine (VF-30)', 'Fine (F-12)', 'Very Good (VG-8)', 'Good (G-4)']

    }
  },
  computed: {
    ...mapGetters([
      'loadedItems'
    ]),
    years () {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1699 }, (value, index) => 1700 + index)
    }
  },
  methods: {
    ...mapActions([
      'createItem'
    ]),
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
        purchasedPrice,
        itemImage
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
          purchasedPrice,
          itemImage
        }
      }
      this.$store.dispatch('createItem', payload)
      this.$bvToast.toast(payload.item.itemName + ' - ' + payload.item.issuedCountry, {
        title: 'Item saved into your collection',
        autoHideDelay: 2000,
        variant: 'success',
        toaster: 'b-toaster-bottom-right'
      })
      this.$router.push('/items')

      // reset form after submit
      this.formData = {
        itemName: '',
        issuedCountry: null,
        type: null,
        grade: null,
        issuedBank: '',
        issuedDate: '',
        itemSerial: '',
        series: '',
        purchasedDate: '',
        purchasedPrice: '',
        itemImage: null
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
    }
  }
}
</script>
