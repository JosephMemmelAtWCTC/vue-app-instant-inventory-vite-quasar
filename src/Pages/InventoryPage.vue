<script>
import {defineComponent} from "vue";
import StoreItem from "src/models/StoreItem";
import Category from "src/models/Category";
import OptionsFAB from "components/OptionsFAB.vue";
import EditModal from "components/EditModal.vue";
import Product from "src/models/Product";
import {InventoryItem, STORAGE_TYPES} from "src/models/InventoryItem";
import ResultsPossiblyEmpty from "components/pages/ResultsPossiblyEmpty.vue";
import TogglesArray from "components/TogglesArray.vue";
import CardsList from "components/CardsList.vue";
import MainContentPage from "components/pages/MainContentPage.vue";
import inventoryExplorer from "src/models/InventoryExplorer";
import InventoryCollectionProper from "src/models/InventoryCollectionProper";
import QrcodeScanner from "components/QRCodeScanner.vue";
import { StreamBarcodeReader } from "vue-barcode-reader";


export default defineComponent({
  name: "InventoryPage",
  components: {
    QrcodeScanner,
    MainContentPage,
    CardsList,
    TogglesArray,
    ResultsPossiblyEmpty,
    EditModal,
    OptionsFAB,
    StreamBarcodeReader
  },
  data() {
    return {
      // newCategory: new Category("","","public/assets/logo.svg"),
      // newCategory: new Category("","","src/assets/icons/folder.svg"),
      newCategory: new Category("","","./assets/icons/folder.svg"),
      newItem: new StoreItem(new Product("","","icons/image-solid.svg",""), 1, undefined),
      newItemImage: {},
      imageUrl: "",
      enableBarcodeScanner: false,
      scannerIsLoaded: false,

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
        ],
        searchString: "",
      },
      trigger: 0,
    };
  },
  props: {
    library: {
      // type: InventoryCollection,
      type: Object,
      required: true,
    },
    inventoryExplorer: {
      // type: InventoryExplorer,
      type: Object,
      required: true,
    },
    leftDrawerOpen: {
      type: Boolean,
      required: true,
      default: true,
    },

  },
  emits: ["call-filter-settings-refresh"],
  methods: {
    saveItem(item){//TODO: Rename to saveIt
      console.log("item:::::::", item);
      // this.library.updateOrAddValue(item);
      this.inventoryExplorer.currentlyIn.addNew(item)
        .then((message)=>{
          console.log("addNewaddNewaddNewaddNewaddNewaddNew ",message);

          this.trigger++;
          // this.$emit("resize")
        });
    },
    removeItem(removeItem) {
      this.inventoryExplorer.currentlyIn.remove(removeItem)
        .then((message)=>{
          console.log("removed ",message);
          this.trigger++;
          // this.$emit("resize")
        });
    },
    sendUpdateCardOpenCategory(docId){
      // this.$emit('card-navigate', docId);
      console.log('navigateTo before in send up');
      this.inventoryExplorer.navigateTo(docId, "relative")
        .then((message)=>{
          console.log("this.triggerthis.triggerthis.triggerthis.trigger: ", message);

          this.trigger++;
          // this.$emit("resize")
        });

    },
    updateFile() {
      if(this.newItemImage.size){
        console.log("this.newItemImage",this.newItemImage);
      }




      //https://stackoverflow.com/a/69873409 for below and rest of new image display
      // this.imageUrl = URL.createObjectURL(this.newItemImage);
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
      this.trigger;//TODO: Find a better way.
      let filteredResults = [];

      const filterByConstructors = [];
      const filterByThreshold = [];

      if(this.filterSettings.toggles[0].state){
        filterByConstructors.push(Category.type);
      }
      if(this.filterSettings.toggles[1].state){
        // filterByConstructors.push(StoreItem.type);
        // if(StoreItem.type){
        //   filterByConstructors.push(STORAGE_TYPES.PRODUCT_GENERIC);
        filterByConstructors.push(Product.type);
        // }
      }

      let filteredDownTo = this.inventoryExplorer.currentlyIn.libraryCollection.filterByType(filterByConstructors);
      if(this.filterSettings.searchString.length > 0 ){
        // filteredDownTo.filterByString();
      }

      return filteredDownTo;
    }
  },
  created: function(){
    this.inventoryExplorer.navigateTo("root")
      .then((message)=>{
        this.trigger++;
        // this.$emit("resize")
      });
  },
  watch: {
    // library: {
    //   handler() {
    //     // this.$emit('example', '');
    //     console.log("~~~~~~~~A");
    //   },
    //   deep: true,
    // },
    // newItemImage: {//.product.imageSrc
    //   handler() {
    //     console.log("this.newItem.product.imageSrc",this.newItemImage);
    //     const reader  = new FileReader();
    //     // it's onload event and you forgot (parameters)
    //     reader.onload = function(e)  {
    //       newItem.product.imageSrc = e.target.result;
    //     }
    //     // you have to declare the file loading
    //     reader.readAsDataURL(this.newItemImage);
    //   },
    //   deep: true,
    // },
  },
});
</script>


<template>
  <q-page class="flex">
    <main-content-page class="w-100 me-2"
    >
<!--      absolute-top-->
<!--        <p>TESTP{{inventoryExplorer.test}}</p>-->
        <header class="bg-body-tertiary rounded-3">
          <div class="row align-items-center p-2">
<!--            <div class="col-auto d-flex text-center align-items-center">-->
<!--              <p class="ms-4">{{searchLabel}}</p>-->
<!--            </div>-->

<!--            <div class="col end-0">-->
<!--              <div class="input-group mb-3">-->
<!--                <span class="input-group-text" id="searchTextDescribe"><i class="bi ms-1 bi-search"></i></span>-->
<!--                <input type="text" v-model="filterSettings.searchString" class="form-control focus-ring-primary" placeholder="" aria-label="Search" aria-describedby="searchTextDescribe">-->
<!--              </div>-->
<!--            </div>-->

            <toggles-array :options="filterSettings.toggles">
            </toggles-array>

            <div class="col-12 ps-3 mb-0 pb-0">
              <nav aria-label="Inventory Explorer Breadcrumbs">
                <ol class="breadcrumb m-2">
                  <li><q-icon name="bi-house" class="me-1"></q-icon></li>
                  <li class="breadcrumb-item" v-for="(breadcrumb, i1) in inventoryExplorer.currentlyIn.breadcrumbs" :key="i1">{{ breadcrumb }}</li>
<!--                  <li class="breadcrumb-item active" aria-current="page">{{'test'}}</li>-->
                  <li class="ms-1">/</li>
                </ol>
<!--                <q-breadcrumbs gutter="xs">-->
<!--                  <q-breadcrumbs-el v-for="(breadcrumb, i) in inventoryExplorer.currentlyIn.breadcrumbs" :key="i" :label="breadcrumb">-->
<!--&lt;!&ndash;                    {{ breadcrumb }}&ndash;&gt;-->
<!--                  </q-breadcrumbs-el>-->
<!--                </q-breadcrumbs>-->

              </nav>
            </div>
          </div>
        </header>
        <results-possibly-empty
          :display-is-empty="filteredLibrary.length === 0"
          empty-title="Whoops"
          empty-text="It looks like there are no results that fit your search criteria, try loosing your requirements or adding more items."
        >
        </results-possibly-empty>
        <div class="row g-2 m-1 row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-lg-6 g-1">
<!--          <cards-list :items="filteredLibrary"-->
<!--                      @save-it="saveItem"-->
<!--                      @remove-it="this.library.delete($event)"-->
<!--                      @card-navigate="sendUpdateCardOpenCategory"-->
<!--          >-->
<!--&lt;!&ndash;            @card-navigate="onUpdateCardOpenCategory"&ndash;&gt;-->
<!--            &lt;!&ndash;                      @card-navigate="removeItem"&ndash;&gt;-->
<!--          </cards-list>-->
<!--          <cards-list :items="inventoryExplorer.currentlyIn.libraryCollection"-->
          <cards-list :items="filteredLibrary"
                      @save-it="saveItem"
                      @remove-it="removeItem"
                      @card-navigate="sendUpdateCardOpenCategory"
                      :key="trigger"
          >
<!--            @card-navigate="onUpdateCardOpenCategory"-->
            <!--                      @card-navigate="removeItem"-->
          </cards-list>
        </div>


        <div class="position-fixed bottom-0 end-0 p-3">
          <options-f-a-b z-index="1000"
                         symbol-classes="bi bi-plus"
                         fab-positioning-margin-right="50px !important"
                         fab-positioning-margin-bottom="50px !important"
                         :fab-button-size="this.leftDrawerOpen? 84:30"
                         :rounded="this.leftDrawerOpen">
            <template #open v-slot="slotProps">
              <ol>
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
                      <div class="border-2 border-info">
                        <q-input filled v-model="this.newItem.product.productId"
                                 label="Product ID"
                                 class="full-width pb-0"
                                 :rules="[val => !!val || '* Required']"
                                 lazy-rules
                        ></q-input>
                        <StreamBarcodeReader
                          v-if="this.enableBarcodeScanner"
                          class="barcodeScanner"
                          @decode="(text) => {
                            console.log(`DECODED: ${text}`);
                            this.newItem.product.productId = text;
                            this.enableBarcodeScanner = false
                          }"
                          @loaded="console.log(`LOADED scanner`); scannerIsLoaded = true"
                        ></StreamBarcodeReader>
                        <div class="pb-3">
                          <button @click="this.enableBarcodeScanner = !this.enableBarcodeScanner">
                            <span v-if="this.enableBarcodeScanner && this.scannerIsLoaded">Turn off scanner?</span>
                            <span v-else>Turn back on scanner?</span>
                          </button>
                        </div>
                      </div>
<!--                      <div class="row">-->
<!--                      </q-file>-->
<!--                        <div class="col-1">-->
<!--                          <q-img-->
<!--                            :src="this.imageUrl"-->
<!--                            spinner-size="64px"-->
<!--                            spinner-color="secondary"-->
<!--                          />-->
<!--                        </div>-->
<!--                        <input type="file" accept="image/*" capture="user" />-->

<!--                        <div class="">-->
<!--                          <q-file filled bottom-slots v-model="this.newItemImage"-->
                      <q-file filled bottom-slots v-model="this.newItem.product.imageURL"
                              label="Select item file"
                              class="full-width"
                              @blur="updateFile()"
                              :rules="[val => !!val || '* Required']"
                              lazy-rules
                      >
<!--                                  @change="updateFile(this.newItemImage)"-->
                      </q-file>
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
                               :rules="[val => val === null ||  val === undefined || val === '' || val >= 0 || 'Count cannot be less than 0']"
                               lazy-rules
                      ></q-input>
                      <div class="input-group mb-3 w-100">

                        <div class="col-2 d-block z-2">
                          <button type="button" @click="this.newItem.numInStock -= (slotProps.editItem.numInStock > 0? 1:0)" class="h-100 d-block rounded-0 rounded-start-3 form-control focus-ring-primary">
                            <i class="bi bi-dash"></i>
                          </button>
                        </div>
                        <div class="col-8 form-control m-0 p-0">

                          <q-input filled v-model.number="this.newItem.numInStock"
                                   type="number"
                                   label="# in stock"
                                   class="full-width w-100"
                                   :rules="[val => val !== null || 'You need to have a quantity', val => val >= 0 || 'Count cannot be less than 0']"
                                   lazy-rules
                          ></q-input>
                        </div>
                        <div class="col-2 d-block z-2">
                          <button type="button" @click="this.newItem.numInStock++" class="h-100 rounded-0 rounded-end-3 form-control focus-ring-primary">
                            <i class="bi bi-plus"></i>
                          </button>
                        </div>
                      </div>
                    </template>
                  </edit-modal>
                </li>
              </ol>
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
                                this.enableBarcodeScanner = true;
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
      </main-content-page>
  </q-page>
</template>


<style scoped>
  .barcodeScanner{
    width: 95%;
  }
  ol {
    list-style-type: none;
  }
/*
  .q-field.row.no-wrap.items-start.q-field--filled.q-file.q-field--auto-height.q-field--labeled.q-field--with-bottom{
    width: 100%
  }
*/
</style>
<style>
  .q-field__append.q-field__marginal.row.no-wrap{
    width: auto;
  }
</style>
