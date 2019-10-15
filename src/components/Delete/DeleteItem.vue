<template>
    <div class="popup-modal">
        <button class="button is-small is-light" @click.prevent="showDeleteModal" ref="btnShow">
            <img src="../../assets/svg/trashcan.svg"/>
        </button>
        <b-modal :id="id + '-delete'" title="Delete items" hide-footer v-model="deleteModal" class="popup-modal__delete">
            <p class="my-4">Are you sure that you want to delete {{ item.itemName }} ?</p>

            <div class="modal-footer">
                <b-button @click="deleteModal = false" class="btn btn-secondary">Cancel</b-button>
                <b-button @click="onDeleteItem(item)" class="btn btn-warning">Confirm</b-button>
            </div>
        </b-modal>
    </div>
</template>

<script>
export default {
  props: ['item'],
  data () {
    return {
      deleteModal: false,
      id: this.item.id
    }
  },
  methods: {
    onDeleteItem (item) {
      this.$store.dispatch('deleteItem', {
        id: item.id
      })
      this.$bvModal.hide(item.id + '-delete')
      this.$store.dispatch('loadItems')
      this.$router.push('/items')
    },
    showDeleteModal() {
      this.$root.$emit('bv::show::modal', this.id + '-delete', '#btnShow')
    }
  }
}
</script>
