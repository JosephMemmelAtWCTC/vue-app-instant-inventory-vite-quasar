<script>
import {defineComponent} from "vue";
import PageInventoryCardsSearch from "components/pages/PageInventoryCardsSearch.vue";
import InventoryCollection from "src/models/InventoryCollection";
import StoreItem from "src/models/StoreItem";
import Category from "src/models/Category";
import OptionsFAB from "components/OptionsFAB.vue";
import EditModal from "components/EditModal.vue";
import Product from "src/models/Product";

// const newItem = new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined)

export default defineComponent({
  name: "InventoryPage",
  components: {EditModal, OptionsFAB, PageInventoryCardsSearch},
  data() {
    return {
      newCategory: new Category("","","src/assets/icons/folder.svg"),
      newItem: new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined),
    };
  },
  props: {
    filterSettings: {
      type: Object,
      required: true,
    },
    library: {
      // type: InventoryCollection,
      type: Object,
      required: true,
    }
  },
  methods: {
    saveItem(item){//TODO: Rename to saveIt
      console.log("item:::::::", item);
      // this.library.updateOrAddValue(item);
      this.library.addNew(item);
    },
  },
  computed: {
    StoreItem() {
      return StoreItem
    },
    Category() {
      return Category
    },
    filteredLibrary() {
      let filteredResults = [];

      const filterByConstructors = [];
      const filterByThreshold = [];

      if(this.filterSettings.toggles[0].state){
        filterByConstructors.push(Category.type);
      }
      if(this.filterSettings.toggles[1].state){
        filterByConstructors.push(StoreItem.type);
      }

      filteredResults = this.library.filterByType(filterByConstructors);

      // if(this.filterSettings.toggles[2].state){
      //   filterByThreshold.push(InventoryItem.STOCKED_LEVEL_STATUSES.);
      // }
      return filteredResults;
    }
  },
});
</script>


<template>
  <q-page class="flex flex-center">
    <page-inventory-cards-search
      :filter-settings="filterSettings"
      :current-combined-items-list="filteredLibrary"
      search-label="Filter Search"
    >
<!--      @remove-category="removeCategory"-->
      <template #extra>
        <div class="position-fixed bottom-0 end-0 p-3">
          <options-f-a-b z-index="1000"
                         symbol-classes="bi bi-plus">
            <template #open v-slot="slotProps">
              <ul>
                <li>
                  <!--                                        :item-constructor-type="this.newCategory.constructor"-->
                  <edit-modal :item="this.newCategory"
                              title="New Category"
                              submit-button-text="Create Category"
                              ref="newCategoryModal"
                              @save-it="saveItem(this.newCategory)"
                  >
                    <template v-slot="slotProps">
                      <q-input filled v-model="this.newCategory.title"
                               autofocus
                               label="Name"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                      <q-input filled v-model="this.newCategory.description"
                               type="textarea"
                               rows="4"
                               label="Description"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                    </template>
                  </edit-modal>
                </li>
                <li>
                  <edit-modal :item="this.newItem"
                              title="New Item"
                              submit-button-text="Create Item"
                              ref="newItemModal"
                              @save-it="saveItem(this.newItem)"
                  >
                    <template v-slot="slotProps">
                      <q-input filled v-model="this.newItem.product.title"
                               label="Name"
                               class="full-width"
                               autofocus
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                      <q-input filled v-model="this.newItem.product.productId"
                               label="Product ID"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                      <q-input filled v-model="this.newItem.product.description"
                               type="textarea"
                               rows="4"
                               label="Description"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                      <q-input filled v-model.number="this.newItem.reorderLevel"
                               type="number"
                               label="Reorder Level"
                               clearable
                               clear-icon="bi-x"
                               placeholder="Leave blank to ignore reorder"
                               class="full-width clearable"
                               :rules="[val => val >= 0 || 'Count cannot be less than 0']"
                               lazy-rules
                      ></q-input>
                      <div class="input-group mb-3 w-100">

                        <div class="col-2 d-block z-2">
                          <button type="button" @click="this.newItem.inStockLevel -= (slotProps.editItem.inStockLevel > 0? 1:0)" class="h-100 d-block rounded-0 rounded-start-3 form-control focus-ring-primary">
                            <i class="bi bi-dash"></i>
                          </button>
                        </div>
                        <div class="col-8 form-control m-0 p-0">

                          <q-input filled v-model.number="this.newItem.inStockLevel"
                                   type="number"
                                   label="# in stock"
                                   class="full-width w-100"
                                   :rules="[val => !!val || 'You need to have a quantity', val => val > 0 || 'Count cannot be less than 0']"
                                   lazy-rules
                          ></q-input>
                        </div>
                        <div class="col-2 d-block z-2">
                          <button type="button" @click="this.newItem.inStockLevel++" class="h-100 rounded-0 rounded-end-3 form-control focus-ring-primary">
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                    </template>
                  </edit-modal>
                </li>
              </ul>
                    <button type="button"
                            @click="
                                                  this.$refs.newCategoryModal.openModal();
                                              "
                            class="btn btn-primary w-100 m-1">
                      <a class="icon-link link-secondary text-decoration-none">
                        <span class="p-2"><i class="bi bi-archive"></i></span>
                        Category
                      </a>
                    </button>
                  <!--                                    TODO: Try Convert to edit-item-card parts again, reuse-->
                  <li>
                      <button type="button"
                              @click="
                                                  this.$refs.newItemModal.openModal();
                                              "
                              class="btn btn-primary w-100 m-1">
                        <a class="icon-link link-secondary text-decoration-none">
                          <span class="p-2"><i class="bi bi-box"></i></span>
                          Item
                        </a>
                      </button>
                  <!--TODO: REMOVE BELOW-->
                  </li>
            </template>
          </options-f-a-b>
        </div>
      </template>
    </page-inventory-cards-search>
  </q-page>
</template>
