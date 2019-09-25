export default {
  setLoadedItems (state, payload) {
    state.loadedItems = payload
  },
  createItem (state, payload) {
    state.loadedItems.push(payload)
  },
  updateItem (state, payload) {
    const item = state.loadedItems.find(item => {
      return item.id === payload.id
    })
    if (payload.itemName) {
      item.itemName = payload.itemName
    }
    if (payload.grade) {
      item.grade = payload.grade
    }
    if (payload.issuedDate) {
      item.issuedDate = payload.issuedDate
    }
    if (payload.issuedCountry) {
      item.issuedCountry = payload.issuedCountry
    }
    if (payload.issuedBank) {
      item.issuedBank = payload.issuedBank
    }
    if (payload.series) {
      item.series = payload.series
    }
    if (payload.purchasedPrice) {
      item.purchasedPrice = payload.purchasedPrice
    }
    if (payload.purchasedDate) {
      item.purchasedDate = payload.purchasedDate
    }
    if (payload.itemSerial) {
      item.itemSerial = payload.itemSerial
    }
    if (payload.type) {
      item.type = payload.type
    }
  },
  deleteItem (state, payload) {
    state.loadedItems.push(payload)
  }
}
