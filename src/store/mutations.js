export default {
  appendItem: (state, { type, item }) => {
    state[type].push(item)
  }
}
