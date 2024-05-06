<script>
  import {defineComponent} from "vue";
  import CategoryCard from "components/cards/CategoryCard.vue";
  import ItemCard from "components/cards/ItemCard.vue";
  import EditModal from "components/EditModal.vue";

  export default defineComponent({
    name: "EditCard",
    components: {CategoryCard, ItemCard, EditModal},
    props: {
      cardComponent: {
        type: String,
        required: true,
      },
      item: {
        type: Object,
        required: true,
      },
      editCopy: {//Because I use template/slot variables- TODO: Ask
        type: Object,
        required: true,
      },
    },
    emits: ['opened-modal', 'save-it', 'remove-it'],
    methods: {
      openEditModal(){
        this.$emit('opened-modal');
        this.$refs.editModal.openModal();
      },

      saveItem(item){
        this.$emit('save-it');
      },
      removeItem(item){
        this.$emit('remove-it', item);
      },

      sendUpdateCardOpenCategory(docId){
        console.log("sendUpdateCardOpenCategory in EditCard", docId);
        this.$emit('card-navigate', docId);
      }

    },
    computed: {
      cardType(){
        return this.cardComponent.toString().replace('Card','')
      }
    }
  });
</script>

<template>
  <component :is="cardComponent" :item="item" @card-clicked="openEditModal" @card-navigate="sendUpdateCardOpenCategory">
  </component>
  <edit-modal :item="this.editCopy"
              @save-it="saveItem"
              can-remove
              @remove-it="removeItem"
              :title="'Edit '+cardType"
              :submit-button-text="'Update '+cardType"
              ref="editModal"
  >
    <template v-slot="slotProps">
      <slot name="form">
      </slot>
    </template>
  </edit-modal>
</template>
});
