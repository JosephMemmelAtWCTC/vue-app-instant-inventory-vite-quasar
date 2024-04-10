<script>
  import {defineComponent} from "vue";

  import StoreItem from "src/models/StoreItem";
  import Product from "src/models/Product";

  import EditCard from "components/cards/EditCard.vue";

  export default defineComponent({
    name: "editItemCard",
    components: {EditCard},
    data() {
      return {
        editInventoryItem: {},
          // new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined),
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
      saveItem(item){
        this.$emit('save-it', [this.item, this.editInventoryItem]);
      },
      removeItem(item){
        this.$emit('remove-it', this.item);
      },
      updateEditItemToValues(){
        this.editInventoryItem = Object.assign(new StoreItem(), this.item);
      },
    },
    created: function () {
      this.updateEditItemToValues();
    },
  });
</script>

<template>
    <edit-card card-component="ItemCard"
               :edit-copy="editInventoryItem"
               :item="this.item"
               @save-it="saveItem"
               @remove-it="removeItem"
               @opened-modal="updateEditItemToValues">
        <template #form="slotProps">
            <q-input filled v-model="editInventoryItem.product.title"
                     label="Name"
                     class="full-width"
                     autofocus
                     :rules="[val => !!val || '* Required']"
                     lazy-rules
            ></q-input>
            <q-input filled v-model="editInventoryItem.product.productId"
                     label="Product ID"
                     class="full-width"
                     :rules="[val => !!val || '* Required']"
                     lazy-rules
            ></q-input>
            <q-input filled v-model="editInventoryItem.product.description"
                     type="textarea"
                     rows="4"
                     label="Description"
                     class="full-width"
                     :rules="[val => !!val || '* Required']"
                     lazy-rules
            ></q-input>
<!--                <q-input filled v-model.number="editItem.reorderLevel"-->
<!--                        type="number"-->
<!--                        label="Reorder Level"-->
<!--                        class="full-width clearable"-->
<!--                        clearable-->
<!--                        clear-icon="bi-x"-->
<!--                        placeholder="Leave blank to ignore reorder"-->
<!--                        :rules="[val => val >= 0 || 'Count cannot be less than 0']"-->
<!--                        lazy-rules-->
<!--                ></q-input>-->
            <q-input filled v-model="editInventoryItem.reorderLevel"
                     type="number"
                     label="Reorder Level"
                     placeholder="Leave blank to ignore reorder"
                     class="full-width"
                     :rules="[val => val >= 0 || 'Count cannot be less than 0']"
                     lazy-rules
            ></q-input>
<!--          clearable, w/class-->
<!--          clear-icon="bi-x"-->

          <!--TODO: Ask about clearable messing up-->
          <div class="input-group mb-3 w-100">

                <div class="col-2 d-block z-2">
                    <button type="button" @click="editInventoryItem.inStockLevel -= (editInventoryItem.inStockLevel > 0? 1:0)" class="h-100 d-block rounded-0 rounded-start-3 form-control focus-ring-primary">
                        <i class="bi bi-dash"></i>
                    </button>
                </div>
                <div class="col-8 form-control m-0 p-0">

                    <q-input filled v-model.number="editInventoryItem.inStockLevel"
                             type="number"
                             label="# in stock"
                             class="full-width w-100"
                             :rules="[val => !!val || 'You need to have a quantity', val => val > 0 || 'Count cannot be less than 0']"
                             lazy-rules
                    ></q-input>
                </div>
                <div class="col-2 d-block z-2">
                    <button type="button" @click="editInventoryItem.inStockLevel++" class="h-100 rounded-0 rounded-end-3 form-control focus-ring-primary">
                        <i class="bi bi-plus"></i>
                    </button>
                </div>
            </div>
        </template>
    </edit-card>
</template>
