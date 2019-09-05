export default {
  addItem: ({ commit }, payload) => {
    commit('appendItem', payload)
  }
}
