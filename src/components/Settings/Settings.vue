<template>
    <div class="popup-modal">
        <b-nav-item active-class="active" v-b-modal.modal-settings exact>Settings</b-nav-item>
        <b-modal id="modal-settings" title="settings" hide-footer class="popup-modal__settings">
            <b-container class="col-sm-8">
                <b-form @submit.prevent="handleSubmit">
                    <b-form-group id="input-group-1">
                        <b-row>
                            <b-col class="form-group col-xs-4">
                                <b-form-row>
                                    <b-col cols="10">
                                        <country-select
                                                id="settingsLocation"
                                                v-model="settingsLocation"
                                                topCountry="AU"
                                                class="custom-select"
                                                :country="settingsLocation"
                                        ></country-select>
                                    </b-col>
                                    <b-col>
                                        <span v-if="flag"><img :src="flag" width="35px" height="30px"/></span>
                                    </b-col>
                                </b-form-row>
                                <b-form-row>
                                    <b-col cols="10">
                                        <b-form-select id="settingsCurrency" :required="true" v-model="settingsCurrency">
                                            <option selected value="null">Select your Currency</option>
                                            <option
                                                    v-for="item in items"
                                                    :key="item.code"
                                                    :value="item.symbol_native"
                                            >{{ item.name }}</option>
                                        </b-form-select>
                                    </b-col>
                                </b-form-row>
                                <b-form-row>
                                    <b-col cols="10">
                                        <label for="settingsInterestRate">Interest Rate</label>
                                        <b-form-input
                                                id="settingsInterestRate"
                                                v-model="settingsInterestRate"
                                                type="text"
                                                placeholder="e.g., 3.5"
                                        ></b-form-input>
                                    </b-col>
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
        </b-modal>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import BCol from 'bootstrap-vue/src/components/layout/col'
import currencies from '../../data/currencies.json'
import * as firebase from 'firebase'

export default {
  components: { BCol },
  data () {
    return {
      settingsLocation: null,
      settingsCurrency: null,
      settingsInterestRate: '',
      items: currencies
    }
  },
  computed: {
    ...mapGetters([
      'loadSettingsLocation',
      'loadSettingsCurrency',
      'loadSettingsInterestRate'
    ]),
    flag () {
      if (this.settingsLocation !== null) {
        let countryCode = this.settingsLocation.toLowerCase()
        return '/flags/' + countryCode + '.svg'
      }
      return false
    }
  },
  mounted() {
    this.setLocation()
    this.setCurrency()
    this.setInterestRate()
  },
  watch: {
    settingsLocation: function (val) {
      this.settingsLocation = val
    },
    settingsCurrency: function (val) {
      this.settingsCurrency = val
    },
    settingsInterestRate: function (val) {
      this.settingsInterestRate = val
    }
  },
  methods: {
    ...mapActions([
      'saveSettings',
      'loadSettings'
    ]),
    handleSubmit() {
      const {
        settingsLocation,
        settingsCurrency,
        settingsInterestRate
      } = this

      const payload = {
        settingsLocation,
        settingsCurrency,
        settingsInterestRate
      }
      this.$store.dispatch('saveSettings', payload)
      this.$store.dispatch('loadSettings')
      this.$bvModal.hide('modal-settings')
    },
    setLocation () {
      firebase.database().ref('settings').once('value')
        .then((data) => {
          this.settingsLocation = data.val().settingsLocation
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    setCurrency () {
      firebase.database().ref('settings').once('value')
        .then((data) => {
          this.settingsCurrency = data.val().settingsCurrency
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    },
    setInterestRate () {
      firebase.database().ref('settings').once('value')
        .then((data) => {
          this.settingsInterestRate = data.val().settingsInterestRate
        })
        .catch(
          (error) => {
            console.log(error)
          }
        )
    }
  }
}
</script>
