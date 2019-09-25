import * as firebase from 'firebase'

export default {
  loadItems ({ commit }) {
    firebase.database().ref('items').once('value')
      .then((data) => {
        const items = []
        const obj = data.val()
        for (let key in obj) {
          items.push({
            id: key,
            itemName: obj[key].itemName,
            grade: obj[key].grade,
            issuedDate: obj[key].issuedDate,
            purchasedPrice: obj[key].purchasedPrice,
            issuedCountry: obj[key].issuedCountry,
            issuedBank: obj[key].issuedBank,
            series: obj[key].series,
            purchasedDate: obj[key].purchasedDate,
            type: obj[key].type,
            itemSerial: obj[key].itemSerial
          })
        }
        commit('setLoadedItems', items)
      })
      .catch(
        (error) => {
          console.log(error)
        }
      )
  },
  createItem ({ commit, getters }, payload) {
    const item = {
      itemName: payload.item.itemName,
      issuedDate: payload.item.issuedDate,
      issuedCountry: payload.item.issuedCountry,
      issuedBank: payload.item.issuedBank,
      series: payload.item.series,
      purchasedPrice: payload.item.purchasedPrice,
      purchasedDate: payload.item.purchasedDate,
      grade: payload.item.grade,
      itemSerial: payload.item.itemSerial,
      type: payload.item.type
    }
    firebase.database().ref('items').push(item)
      .then((data) => {
        const key = data.key
        commit('createItem', {
          ...item,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
  },
  updateItemData ({ commit }, payload) {
    const updateObj = {}
    if (payload.itemName) {
      updateObj.itemName = payload.itemName
    }
    if (payload.grade) {
      updateObj.grade = payload.grade
    }
    if (payload.issuedDate) {
      updateObj.issuedDate = payload.issuedDate
    }
    if (payload.issuedCountry) {
      updateObj.issuedCountry = payload.issuedCountry
    }
    if (payload.issuedBank) {
      updateObj.issuedBank = payload.issuedBank
    }
    if (payload.series) {
      updateObj.series = payload.series
    }
    if (payload.purchasedPrice) {
      updateObj.purchasedPrice = payload.purchasedPrice
    }
    if (payload.purchasedDate) {
      updateObj.purchasedDate = payload.purchasedDate
    }
    if (payload.itemSerial) {
      updateObj.itemSerial = payload.itemSerial
    }
    if (payload.type) {
      updateObj.type = payload.type
    }
    firebase.database().ref('items').child(payload.id).update(updateObj)
      .then(() => {
        commit('updateItem', payload)
      })
      .catch(error => {
        console.log(error)
      })
  },
  deleteItem ({ commit }, payload) {
    firebase.database().ref('items').child(payload.id).remove()
      .then(() => {
        commit('deleteItem', payload)
      })
      .catch(error => {
        console.log(error)
      })
  }
}
