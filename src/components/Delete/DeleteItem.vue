<template>
    <div>
        <b-button v-b-modal.modal-2 class="btn btn-danger">Delete</b-button>

        <b-modal id="modal-2" title="Delete items" hide-footer="true" v-model="deleteModal">
            <p class="my-4">Are you sure that you want to delete {{ deleteItemName }} ?</p>

            <div class="modal-footer">
                <b-button @click="deleteModal = false" class="btn btn-secondary">Cancel</b-button>
                <b-button @click="onDeleteItem" class="btn btn-warning">Confirm</b-button>
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
      id: this.item.id,
      deleteItemName: this.item.itemName
    }
  },
  methods: {
    onDeleteItem () {
      this.$store.dispatch('deleteItem', {
        id: this.item.id
      })
      this.$store.dispatch('loadItems')
      this.$router.push('/items')
    }
  }
}
</script>
