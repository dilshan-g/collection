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
  }
}
