export default {
  loadedItems (state) {
    return state.loadedItems
  },
  loadedItem (state) {
    return (itemId) => {
      return state.loadedItems.find((item) => {
        return item.id === itemId
      })
    }
  },
  loading (state) {
    return state.loading
  },
  getItemsCount (state) {
    return (type) => {
      return state.loadedItems.filter(state => state.type === type).length
    }
  },
  getItemsValueCount (state) {
    return (type) => {
      return state.loadedItems.filter(state => {
        return state.type === type
      })
    }
  },
  loadSettingsLocation (state) {
    if (typeof state.settingsLocation === 'undefined' || state.settingsLocation === null) {
      return null
    } else {
      return state.settingsLocation
    }
  },
  loadSettingsCurrency (state) {
    if (typeof state.settingsCurrency === 'undefined' || state.settingsCurrency === null) {
      return null
    } else {
      return state.settingsCurrency
    }
  }
}
