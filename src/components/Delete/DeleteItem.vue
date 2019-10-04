<template>
    <div>
        <button class="button is-small is-light" @click.prevent="showDeleteModal" ref="btnShow">
            <img src="../../assets/svg/trashcan.svg"/>
        </button>
        <b-modal :id="id + '-delete'" title="Delete items" hide-footer v-model="deleteModal">
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
      this.$bvModal.hide(this.item.id + '-delete')
      this.$store.dispatch('loadItems')
      this.$router.push('/items')
    },
    showDeleteModal() {
      this.$root.$emit('bv::show::modal', this.item.id + '-delete', '#btnShow')
    }
  }
}
</script>
