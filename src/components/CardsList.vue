<script>
import {defineComponent} from "vue";
import EditCategoryCard from "components/cards/EditCategoryCard.vue";
import EditItemCard from "components/cards/EditItemCard.vue";

export default defineComponent({
  name: "CardsList",
  components: {EditCategoryCard, EditItemCard},
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['save-it', 'remove-it', 'card-navigate'],
  methods: {
    saveItem(item){
      console.log("Saved send up CardsList", item);
      this.$emit('save-it', item);
    },
    removeItem(item){
      console.log("Removed send up CardsList");
      this.$emit('remove-it', item);
    },
    sendUpdateCardOpenCategory(docId){
      this.$emit('card-navigate', docId);
    }
  },
});
</script>

<template>
  <component v-for="(item, i) in items" :key="i"
             :is="item.constructor.cardDetailsComponent"
             :item="item"
             :edit-item="item"
             @save-it="saveItem"
             @remove-it="removeItem"
             @card-navigate="sendUpdateCardOpenCategory">
  </component>
</template>
