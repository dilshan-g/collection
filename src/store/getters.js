export default {
  itemCount: (state) => {
    return state.banknotes.length + state.coins.length
  },
  getAllBanknotes: (state) => {
    return state.items.filter((item) => {
      return item.type === 'banknotes'
    })
  },
  getAllCoins: (state) => {
    return state.items.filter((item) => {
      return item.type === 'coins'
    })
  }
}
