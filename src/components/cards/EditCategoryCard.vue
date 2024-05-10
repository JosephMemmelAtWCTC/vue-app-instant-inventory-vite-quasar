<script>
import {defineComponent} from "vue";
import EditCard from "components/cards/EditCard.vue";
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";

export default defineComponent({
  name: "EditCategoryCard",
  components: {EditCard},
  data() {
    return {
      editCategory: {},
    }
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  emits: ['save-it', 'remove-it'],
  methods: {
    saveCategory(item){
      this.$emit('save-it', [this.item, this.editCategory]);
    },
    removeItem(item){
      this.$emit('remove-it', this.item);
    },
    updateEditCategoryToValues(){
      console.log("updateEditCategoryToValues(){");
      this.editCategory = Object.assign(new Category(), this.item);
    },
    sendUpdateCardOpenCategory(docId){
      console.log("sendUpdateCardOpenCategory in EditCategoryCard", docId);
      // this.$emit('card-navigate', docId);
    //   TODO: ASK!!! WHY!!! FOR SOME REASON THIS WAS DUPLICATING IT
    }
  },
  created: function () {
    this.updateEditCategoryToValues();
  },
});
</script>

<template>
  <edit-card card-component="CategoryCard"
             :edit-copy="editCategory"
             :item="this.item"
             @save-it="saveCategory"
             @remove-it="removeItem"
             @opened-modal="updateEditCategoryToValues"
             @card-navigate="sendUpdateCardOpenCategory"
  >
      <template #form="slotProps">
      <q-input filled v-model="editCategory.title"
               autofocus
               label="Name"
               class="full-width"
               :rules="[val => !!val || '* Required']"
               lazy-rules
      ></q-input>
      <q-input filled v-model="editCategory.description"
               type="textarea"
               rows="4"
               label="Description"
               class="full-width"
               :rules="[val => !!val || '* Required']"
               lazy-rules
      ></q-input>
    </template>
  </edit-card>
</template>
});
