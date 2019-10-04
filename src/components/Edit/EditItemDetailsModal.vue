<template>
  <div>
    <button class="button is-small is-light" @click.prevent="showEditModal" ref="btnEdit">
      <img src="../../assets/svg/pencil.svg"/>
    </button>
    <b-modal :id="editId + '-edit'" title="Edit items" hide-footer v-model="editModal" size="lg">
        <b-form>
          <b-form-group id="input-group-1">
            <b-row>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="item_name">Item name:</label>
                  <b-form-input
                          id="item_name"
                          v-model="editedItemName"
                          type="text"
                          placeholder="e.g., Ceylon one rupee"
                  ></b-form-input>
                  <label for="issued_date" v-show="editedType === 'banknotes'">Issued date:</label>
                  <b-form-input
                          id="issued_date"
                          v-model="editedIssuedDate"
                          type="date"
                          placeholder="e.g., 23/07/2018"
                          v-show="editedType === 'banknotes'"
                  ></b-form-input>
                  <label for="issued_date" v-show="editedType === 'coins'">Issued year:</label>
                  <b-form-select
                          id="issued_date"
                          :options="years"
                          v-model="editedIssuedDate"
                          v-show="editedType === 'coins'"
                  ></b-form-select>
                </b-form-row>
                <b-form-row>
                  <label for="purchased_date">Purchased date:</label>
                  <b-form-input
                          id="purchased_date"
                          v-model="editedPurchasedDate"
                          type="date"
                          placeholder="e.g., 23/07/2018"
                  ></b-form-input>
                  <label for="purchased_price">Purchased price:</label>
                  <b-form-input
                          id="purchased_price"
                          v-model="editedPurchasedPrice"
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
                          v-model="editedType"
                          :options="types"
                  ></b-form-select>
                  <label for="grade">Item condition:</label>
                  <b-form-select
                          id="grade"
                          v-model="editedGrade"
                          :options="grades"
                  ></b-form-select>
                  <label for="issued_country">Issued country:</label>
                  <country-select
                          v-model="editedIssuedCountry"
                          topCountry="LK"
                          :country="editedIssuedCountry"
                          class="custom-select"/>
                </b-form-row>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group id="input-group-2" class="advanced-data">
            <b-row>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="item_serial" v-show="editedType === 'banknotes'">Serial number:</label>
                  <b-form-input
                          id="item_serial"
                          v-model="editedItemSerial"
                          type="text"
                          placeholder="e.g., AA000001"
                          v-show="editedType === 'banknotes'"
                  ></b-form-input>
                  <label for="item_series">Series:</label>
                  <b-form-input
                          id="item_series"
                          v-model="editedSeries"
                          type="text"
                          placeholder="e.g., Flora and fauna"
                  ></b-form-input>
                </b-form-row>
              </b-col>
              <b-col class="form-group col-xs-4">
                <b-form-row>
                  <label for="issued_bank" v-show="editedType === 'banknotes' || editedType === 'stamps'">Issued bank/authority:</label>
                  <b-form-input
                          id="issued_bank"
                          v-model="editedIssuedBank"
                          type="text"
                          placeholder="e.g., Reserve Bank of Australia"
                          v-show="editedType === 'banknotes' || editedType === 'stamps'"
                  ></b-form-input>
                </b-form-row>
              </b-col>
            </b-row>
          </b-form-group>
          <b-form-group id="input-group-3">
            <div class="modal-footer">
              <b-button @click="editModal = false">Cancel</b-button>
              <b-button @click="onSaveChanges" class="btn btn-primary">Save</b-button>
            </div>
          </b-form-group>
        </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      editModal: false,
      editId: this.item.id,
      editedItemName: this.item.itemName,
      editedIssuedCountry: this.item.issuedCountry,
      editedType: this.item.type,
      editedGrade: this.item.grade,
      editedIssuedBank: this.item.issuedBank,
      editedIssuedDate: this.item.issuedDate,
      editedItemSerial: this.item.itemSerial,
      editedSeries: this.item.series,
      editedPurchasedDate: this.item.purchasedDate,
      editedPurchasedPrice: this.item.purchasedPrice,
      grades: [{ text: 'Select the item condition', value: null }, 'Uncirculated', 'About Uncirculated', 'Extremely Fine', 'Very Fine', 'Fine', 'Very Good', 'Fair', 'Poor'],
      types: [{ text: 'Select the item type', value: null }, 'banknotes', 'coins', 'stamps'],
      coin_grades: [{ text: 'Select the item condition', value: null }, 'Mint State (MS-65 to 70)', 'Mint State (MS-60 to 64)', 'About Uncirculated (AU-50)', 'Extremely Fine (EF-40, or XF-40)', 'Very Fine (VF-30)', 'Fine (F-12)', 'Very Good (VG-8)', 'Good (G-4)']
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedItemName.trim() === '' || this.editedGrade.trim() === '') {
        return
      }
      this.editModal = false
      this.$store.dispatch('updateItemData', {
        id: this.item.id,
        itemName: this.editedItemName,
        issuedCountry: this.editedIssuedCountry,
        type: this.editedType,
        grade: this.editedGrade,
        issuedBank: this.editedIssuedBank,
        issuedDate: this.editedIssuedDate,
        itemSerial: this.editedItemSerial,
        series: this.editedSeries,
        purchasedDate: this.editedPurchasedDate,
        purchasedPrice: this.editedPurchasedPrice
      })
      this.$bvToast.toast(this.editedItemName + ' - ' + this.editedIssuedCountry, {
        title: 'An item edited in your collection',
        autoHideDelay: 5000,
        variant: 'success',
        toaster: 'b-toaster-bottom-right'
      })
    },
    showEditModal() {
      this.$root.$emit('bv::show::modal', this.editId + '-edit', '#btnEdit')
    }
  },
  computed: {
    years () {
      const year = new Date().getFullYear()
      return Array.from({ length: year - 1699 }, (value, index) => 1700 + index)
    }
  }
}
</script>
