<script>
import {defineComponent} from "vue";
import EditCategoryCard from "components/cards/EditCategoryCard.vue";
import TogglesArray from "components/TogglesArray.vue";

export default defineComponent({
  name: "CardsList",
  components: {EditCategoryCard},
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ['save-it', 'remove-it'],
  methods: {
    saveItem(item){
      console.log("Saved send up CardsList", item);
      this.$emit('save-it', item);
    },
    removeItem(item){
      console.log("Removed send up CardsList");
      this.$emit('remove-it', item);
    },
  },
});
</script>

<template>
  <component v-for="(item, i) in items" :key="i"
             :is="item.constructor.cardDetailsComponent"
             :item="item"
             :edit-item="item"
             @save-it="saveItem"
             @remove-it="removeItem">
  </component>
</template>
