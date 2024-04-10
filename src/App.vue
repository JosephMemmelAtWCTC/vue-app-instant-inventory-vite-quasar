<!--<template>-->
<!--  <router-view-->
<!--    :appNavigation="{currentPage: 'home'}"-->
<!--    :library="library"/>-->
<!--</template>-->
<!--    :appNavigation="appNavigation"-->

<script>
import {defineComponent} from "vue";
// @ = src

import QuasarAppLayout from "components/structure/QuasarAppLayout.vue"
import NavigateIconItem from "components/NavigateIconItem.vue"
import EditModal from "components/EditModal.vue";
import OptionsFAB from "components/OptionsFAB.vue";


import PageInventoryCardsSearch from "components/pages/PageInventoryCardsSearch.vue";
import PageTitleTable from "components/pages/PageTitleTable.vue";


import InventoryCollection from "./models/InventoryCollection.js"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"

// import { InventoryCollection, StoreItem, Category, Product } from "@/models/app-modals.js"
// import { InventoryCollection, StoreItem, Category, Product } from "@/js/models/app-models.js"

export default defineComponent({
  components: {OptionsFAB, PageInventoryCardsSearch, EditModal, PageTitleTable, QuasarAppLayout, NavigateIconItem},
  data() {
    return {
      library: new InventoryCollection()
        .add(new Category('Category 1','Category 1\'s description', 'src/assets/icons/folder.svg'))
        .add(new StoreItem(
          new Product(
            'Fjallraven - Foldsack No. 1 Backpack',
            'Your perfect pack for everyday use and walks in the forest.',
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            '923087'
          ), 2, 4, Date.now() - 1000 * 60 * 60 * 9)
        ),
      appInfo: {
        appTitle: "Instant Inventory",
        appVersion: "Vue App v4.0 (Demo)",
      },
      appPageConfigSettings: {
        profileName: "Test Testerson",
        customName: "Custom Name",
      },
      appNavigation: {
        currentPage: "home",
        currentPageLabel: "",
      },
      filterSettings: {
        toggles: [
          {
            label: "Include Categories",
            state: true
          },
          {
            label: "Include Items",
            state: true
          },
          {
            label: "Only Under Threshold",
            state: false
          },
        ],
        searchString: "",
      },

      newItem: new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined),
      newCategory: new Category("","","src/assets/icons/folder.svg"),
    }
  },
  methods: {
    openNavPage(pageLabel) {
      this.currentPageLabel = pageLabel.charAt(0).toUpperCase() + pageLabel.slice(1);

      this.appNavigation.currentPage = pageLabel;
    },
    saveItem(item){
      console.log("It came here", item);
      // // this.library
      console.log("Old", item[0]);
      console.log("New", item[1]);
      this.library.updateOrAddValue(item[0], item[1])
    },
    removeItem(removeItem) {
      console.log("It came here removeItem", removeItem);

      this.library.remove(removeItem);
    },

  },

  computed: {
    computedCurrentPageTitle() {
      return this.appNavigation.currentPage.charAt(0).toUpperCase() + this.appNavigation.currentPage.slice(1);
    }
  },

  created: function () {

  },
  mounted() {
    this.currentPageTitle = this.appNavigation.currentPageLabel.charAt(0).toUpperCase() + this.appNavigation.currentPageLabel.slice(1);
  },
  // watch:   calls the function if the value changes
  // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  watch: {
    library: {
      handler() {
        console.log('Library changed: ');
      },
      deep: true,
    },
  },
})
</script>

<template>
  <quasar-app-layout
    :editable-kiosk-name="appPageConfigSettings.customName"
    @update-kiosk-name="appPageConfigSettings.customName = $event"
    :current-page-title="computedCurrentPageTitle"
  >
    <!-- SIDEBAR -->
    <template #left class="d-none d-md-block h-100">
      <div class="d-flex flex-column justify-content-between h-100">
        <div>
          <navigate-icon-item tooltip-info="Home" @click="openNavPage('home')" li-extra-classes="p-2 mb-2" icon-class="bi-house">
          </navigate-icon-item>
          <navigate-icon-item tooltip-info="Inventory" @click="openNavPage('inventory')" li-extra-classes="p-2 mb-2" icon-class="material-symbols-outlined" icon-content="package_2"><!--fa-solid fa-boxes-stacked-->
          </navigate-icon-item>
          <navigate-icon-item tooltip-info="Recents" @click="openNavPage('recents')" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="library.length">
          </navigate-icon-item>
          <navigate-icon-item tooltip-info="Account" @click="openNavPage('account')" li-extra-classes="p-2 mb-2" icon-class="bi-person">
          </navigate-icon-item>
        </div>
        <footer>
          <button type="button" class="btn btn-primary rounded-0 p-0">
            <a class="icon-link link-secondary">
              <span class="p-2 ps-1 pe-0"><i class="bi bi-phone"></i></span>
              <strong><a href="#" class="link-secondary link-underline-opacity-0 pe-1">Download our app</a></strong>
            </a>
          </button>
        </footer>
      </div>
    </template>

    <template #footer >
      <div class="row q-gutter-none m-0 p-0">
        <div class="col mt-5 bg-body-secondary q-gutter-none">
          <div class="row h-100">
            <div class="col-12 h-50">
              <div class="dropup-center dropup row justify-content-center">
                <div class="w-auto" v-if="appNavigation.currentPage==='inventory'">
                  <button id="addButton" type="button" class="rounded-1 btn btn-primary my-auto btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="bi bi-plus text-secondary"></i>
                  </button>
                </div>
                <div>
                  <ul class="dropdown-menu pe-2">
                    <li>
                      <button type="button" class="btn btn-primary w-100 m-1" data-bs-toggle="modal" data-bs-target="#newCategoryModel">
                        <a class="icon-link link-secondary text-decoration-none">
                          <span class="p-2"><i class="bi bi-archive"></i></span>
                          Category
                        </a>
                      </button>
                    </li>
                    <li>
                      <button type="button" class="btn btn-primary w-100 m-1" data-bs-toggle="modal" data-bs-target="#newItemModel">
                        <a class="icon-link link-secondary text-decoration-none">
                          <span class="p-2"><i class="bi bi-box"></i></span>
                          Item
                        </a>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
            <div class="col h-50">
              <navigate-icon-item icon-class="bi-house" @click="openNavPage('home')" class="h-100">
              </navigate-icon-item>
            </div>
            <div class="col h-50">
              <navigate-icon-item icon-class="material-symbols-outlined" icon-content="package_2" @click="openNavPage('inventory')" class="h-100">
              </navigate-icon-item>
            </div>
          </div>
        </div>

        <div class="col-4 centerNavTallOption">
          <button id="scanButton" data-navPageTarget="inventory" @click="openNavPage('inventory')" type="button" data-bs-toggle="modal" data-bs-target="#newItemModel" class="link-secondary primaryNavMovePage btn btn-primary w-100 p-3 rounded-0 rounded-top-5">
            <img src="assets/icons/upc-scan.svg" class="w-100" alt="Scan Barcode">
          </button>
        </div>

        <div class="col mt-5 bg-body-secondary">
          <div class="row h-100">
            <div class="col-12 h-50">

            </div>
            <div class="col h-50">
              <navigate-icon-item @click="openNavPage('recents')" icon-class="bi-arrow-left-right" :badge-text="'recentItemsList.length'+''" class="h-100">
              </navigate-icon-item>
            </div>
            <div class="col h-50">
              <navigate-icon-item @click="openNavPage('account')" icon-class="bi-person" class="h-100">
              </navigate-icon-item>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #content>
      <page-title-table
        v-if="appNavigation.currentPage==='home'"
        :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"
        :jumbotron-title="appInfo.appTitle"
        :table-items="[]">
        <!--                :table-items="[categoriesList.length, itemsList.length, '#', itemsList.filter(item => item.hasLowStock).length]"-->
        <template #jumbotronsubtext>
          <p class="w-100">ConnectionInfo</p>
          <p class="">{{appInfo.appVersion}}</p>
        </template>
      </page-title-table>

      <page-inventory-cards-search
        v-if="appNavigation.currentPage==='inventory'"
        :filter-settings="filterSettings"
        :current-combined-items-list="library"
        search-label="Filter Search"
        @remove-item="removeItem"
        @save-it="saveItem"
      >
        <!--                    @remove-category="removeCategory"-->

        <template #extra>
          <div class="position-fixed bottom-0 end-0 p-3">
            <options-f-a-b z-index="1000"
                           symbol-classes="bi bi-plus">
              <template #open v-slot="slotProps">
                <li>
                  <!--                                        :item-constructor-type="this.newCategory.constructor"-->
                  <edit-modal :item="this.newCategory"
                              @save-it="saveItem"
                              title="New Category"
                              submit-button-text="Create Category"
                              ref="newCategoryModal"
                  >
                    <template v-slot="slotProps">
                      <!--                                        TODO: Make use slotprops instead-->
                      <q-input filled v-model="slotProps.editItem.title"
                               autofocus
                               label="Name"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                      <q-input filled v-model="slotProps.editItem.description"
                               type="textarea"
                               rows="4"
                               label="Description"
                               class="full-width"
                               :rules="[val => !!val || '* Required']"
                               lazy-rules
                      ></q-input>
                    </template>
                  </edit-modal>
                  <li>
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
                  </li>
                  <!--                                    TODO: Try Convert to edit-item-card parts again, reuse-->
                  <li>
                    <edit-modal :item="this.newItem"
                                @save-it="saveItem"
                                title="New Item"
                                submit-button-text="Create Item"
                                ref="newItemModal"
                    >
                      <template v-slot="slotProps">
                        <q-input filled v-model="slotProps.editItem.product.title"
                                 label="Name"
                                 class="full-width"
                                 autofocus
                                 :rules="[val => !!val || '* Required']"
                                 lazy-rules
                        ></q-input>
                        <q-input filled v-model="slotProps.editItem.product.productId"
                                 label="Product ID"
                                 class="full-width"
                                 :rules="[val => !!val || '* Required']"
                                 lazy-rules
                        ></q-input>
                        <q-input filled v-model="slotProps.editItem.product.description"
                                 type="textarea"
                                 rows="4"
                                 label="Description"
                                 class="full-width"
                                 :rules="[val => !!val || '* Required']"
                                 lazy-rules
                        ></q-input>
                        <q-input filled v-model.number="slotProps.editItem.reorderLevel"
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
                            <button type="button" @click="slotProps.editItem.inStockLevel -= (slotProps.editItem.inStockLevel > 0? 1:0)" class="h-100 d-block rounded-0 rounded-start-3 form-control focus-ring-primary">
                              <i class="bi bi-dash"></i>
                            </button>
                          </div>
                          <div class="col-8 form-control m-0 p-0">

                            <q-input filled v-model.number="slotProps.editItem.inStockLevel"
                                     type="number"
                                     label="# in stock"
                                     class="full-width w-100"
                                     :rules="[val => !!val || 'You need to have a quantity', val => val > 0 || 'Count cannot be less than 0']"
                                     lazy-rules
                            ></q-input>
                          </div>
                          <div class="col-2 d-block z-2">
                            <button type="button" @click="slotProps.editItem.inStockLevel++" class="h-100 rounded-0 rounded-end-3 form-control focus-ring-primary">
                              <i class="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                      </template>
                    </edit-modal>
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
                    </li>
                    <!--TODO: REMOVE BELOW-->
                  </li>
                </li>
              </template>
            </options-f-a-b>
          </div>
        </template>
      </page-inventory-cards-search>

    </template>
  </quasar-app-layout>

</template>

<style scoped>

</style>

