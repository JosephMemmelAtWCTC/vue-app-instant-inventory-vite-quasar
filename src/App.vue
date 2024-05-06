<template>
  <router-view
    :auth-user="this.authUser"
    :library="this.library"
    :app-info="this.appInfo"
    :filter-settings="this.filterSettings"
  />
</template>
<!--    :library="library"-->
<!--    :appNavigation="appNavigation"-->
<!--    :appNavigation="{currentPage: 'home'}"-->

<script>
import {defineComponent} from "vue";

import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";//TODO: Ask about repeating imports

import User from "/src/models/FullUserDetails.js"
import FullUserDetails from "/src/models/FullUserDetails.js";

import {accounts, auth, db, inventory, storage} from "src/models/Firebase.js";



import NavigateIconItem from "components/NavigateIconItem.vue"
import EditModal from "components/EditModal.vue";
import OptionsFAB from "components/OptionsFAB.vue";


import PageInventoryCardsSearch from "components/pages/PageInventoryCardsSearch.vue";
import PageTitleTable from "components/pages/PageTitleTable.vue";


import InventoryCollection from "./models/InventoryCollection.js"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"

export default defineComponent({
  // components: {OptionsFAB, PageInventoryCardsSearch, EditModal, PageTitleTable, QuasarAppLayout, NavigateIconItem},

  data() {
    return {
      authUser: new FullUserDetails(),

      library: new InventoryCollection(),
        // .add(new Category('Category 1','Category 1\'s description', 'src/assets/icons/folder.svg'))
        // .add(new StoreItem(
        //   new Product(
        //     'Fjallraven - Foldsack No. 1 Backpack',
        //     'Your perfect pack for everyday use and walks in the forest.',
        //     'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
        //     '923087'
        //   ),
        // 2, 4, Date.now() - 1000 * 60 * 60 * 9)
      // ),
      appInfo: {
        appTitle: "Instant Inventory",
        appVersion: "Vue App v4.0 (Demo)",
        sideBarWidth: 180,
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
      }


    }
  },
  methods: {
    // TODO: Move to inventoryCollection
    onInventorySnapshot(categoriesQuerySnapshot, objectConstructor){
      this.library.removeAllOfType(objectConstructor.type);
      const data = [];
      categoriesQuerySnapshot.forEach(doc => {
        const dataPush = doc.data();
        dataPush.docId = doc.id;
        data.push(dataPush);
      });
      data.forEach((inventoryData, i) => {
        console.log("inventoryItemData, i", inventoryData);
        const found = new objectConstructor(inventoryData);
        // const foundCategory = new Category(data.title, data.description, data.imageURL, data.items);
        this.library.add(found);
        console.log("foundItem", found)
      });
    },

    setLibraryFromDocPath(categoryPath){
      console.log("setLibraryFromDocPath starting...");

    /*   Structure will be category holding other categories and lists of item references
    // TODO: ASK ABOUT BEST STRUCTURE !!!
    Should include list of unique words to aid in searching, store in 2 places?
    */

      const newDisplayLibrary = new InventoryCollection();

      inventory.collection('categories')
        .onSnapshot(snapshot => {
          this.onInventorySnapshot(snapshot, Category);
        })
      inventory.collection('products')
        .onSnapshot(snapshot => {
          this.onInventorySnapshot(snapshot, Product);
        })

      this.library = newDisplayLibrary;
      return "";
    },
  },
  created() {
    // TODO: check for logged in user
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.authUser = new FullUserDetails(new User(user));
        accounts.doc(this.authUser.uid).get()
          .then((supplementalAccountDoc) => {
            const supplementalData = supplementalAccountDoc.data();
            this.authUser.image = supplementalData.image ?? null;
            this.authUser.role =supplementalData.role ?? null;
          })
        console.log('Signed in as: ', user);
        // TODO: Check if first time logged in and make data
        // document.getElementById('message').innerHTML = 'Signed in as: ' + displayName + ' (' + email + ')';

      } else {
        // User is signed out.
        console.log('Not signed in.');

        this.authUser = new FullUserDetails();
        this.$router.push({ path: '/login' });

        // document.getElementById('message').innerHTML = 'Signed out.';
      }
    });

    // .add(new Category('Category 1','Category 1\'s description', 'src/assets/icons/folder.svg'))


    this.setLibraryFromDocPath("/");


  },


  // data() {
  //   return {
  //     // appInfo: {
  //     //   appTitle: "Instant Inventory",
  //     //   appVersion: "Vue App v4.0 (Demo)",
  //     // },
  //     // appPageConfigSettings: {
  //     //   profileName: "Test Testerson",
  //     //   customName: "Custom Name",
  //     // },
  //     // appNavigation: {
  //     //   currentPage: "home",
  //     //   currentPageLabel: "",
  //     // },
  //     //
  //     // newItem: new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined),
  //     // newCategory: new Category("","","src/assets/icons/folder.svg"),
  //   }
  // },
  // methods: {
  //   // openNavPage(pageLabel) {
  //   //   this.currentPageLabel = pageLabel.charAt(0).toUpperCase() + pageLabel.slice(1);
  //   //
  //   //   this.appNavigation.currentPage = pageLabel;
  //   // },
  //   // saveItem(item){
  //   //   console.log("It came here", item);
  //   //   // // this.library
  //   //   console.log("Old", item[0]);
  //   //   console.log("New", item[1]);
  //   //   this.library.updateOrAddValue(item[0], item[1])
  //   // },
  //   // removeItem(removeItem) {
  //   //   console.log("It came here removeItem", removeItem);
  //   //
  //   //   this.library.remove(removeItem);
  //   // },
  //
  // },
  //
  // computed: {
  //   // StoreItem() {
  //   //   return StoreItem
  //   // },
  //   // Category() {
  //   //   return Category
  //   // },
  //   // computedCurrentPageTitle() {
  //   //   return this.appNavigation.currentPage.charAt(0).toUpperCase() + this.appNavigation.currentPage.slice(1);
  //   // },
  //   // filteredLibrary() {
  //   //   let filteredResults = [];
  //   //
  //   //   const filterByConstructors = [];
  //   //   const filterByThreshold = [];
  //   //
  //   //   if(this.filterSettings.toggles[0].state){
  //   //     filterByConstructors.push(Category.type);
  //   //   }
  //   //   if(this.filterSettings.toggles[1].state){
  //   //     filterByConstructors.push(StoreItem.type);
  //   //   }
  //   //
  //   //   filteredResults = this.library.filterByType(filterByConstructors);
  //   //
  //   //   // if(this.filterSettings.toggles[2].state){
  //   //   //   filterByThreshold.push(InventoryItem.STOCKED_LEVEL_STATUSES.);
  //   //   // }
  //   //   return filteredResults;
  //   // }
  // },
  //
  // created: function () {
  //
  // },
  // mounted() {
  //   // this.currentPageTitle = this.appNavigation.currentPageLabel.charAt(0).toUpperCase() + this.appNavigation.currentPageLabel.slice(1);
  // },
  // // watch:   calls the function if the value changes
  // // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  // watch: {
  //   // library: {
  //   //   handler() {
  //   //     console.log('Library changed: ');
  //   //   },
  //   //   deep: true,
  //   // },
  // },
})
</script>

<!--<template>-->
<!--  <quasar-app-layout-->
<!--    :editable-kiosk-name="appPageConfigSettings.customName"-->
<!--    @update-kiosk-name="appPageConfigSettings.customName = $event"-->
<!--    :current-page-title="computedCurrentPageTitle"-->
<!--  >-->


<!--    <template #footer >-->
<!--      <div class="row q-gutter-none m-0 p-0">-->
<!--        <div class="col mt-5 bg-body-secondary q-gutter-none">-->
<!--          <div class="row h-100">-->
<!--            <div class="col-12 h-50">-->
<!--              <div class="dropup-center dropup row justify-content-center">-->
<!--                <div class="w-auto" v-if="appNavigation.currentPage==='inventory'">-->
<!--                  <button id="addButton" type="button" class="rounded-1 btn btn-primary my-auto btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">-->
<!--                    <i class="bi bi-plus text-secondary"></i>-->
<!--                  </button>-->
<!--                </div>-->
<!--                <div>-->
<!--                  <ul class="dropdown-menu pe-2">-->
<!--                    <li>-->
<!--                      <button type="button" class="btn btn-primary w-100 m-1" data-bs-toggle="modal" data-bs-target="#newCategoryModel">-->
<!--                        <a class="icon-link link-secondary text-decoration-none">-->
<!--                          <span class="p-2"><i class="bi bi-archive"></i></span>-->
<!--                          Category-->
<!--                        </a>-->
<!--                      </button>-->
<!--                    </li>-->
<!--                    <li>-->
<!--                      <button type="button" class="btn btn-primary w-100 m-1" data-bs-toggle="modal" data-bs-target="#newItemModel">-->
<!--                        <a class="icon-link link-secondary text-decoration-none">-->
<!--                          <span class="p-2"><i class="bi bi-box"></i></span>-->
<!--                          Item-->
<!--                        </a>-->
<!--                      </button>-->
<!--                    </li>-->
<!--                  </ul>-->
<!--                </div>-->
<!--              </div>-->

<!--            </div>-->
<!--            <div class="col h-50">-->
<!--              <navigate-icon-item icon-class="bi-house" @click="openNavPage('home')" class="h-100">-->
<!--              </navigate-icon-item>-->
<!--            </div>-->
<!--            <div class="col h-50">-->
<!--              <navigate-icon-item icon-class="material-symbols-outlined" icon-content="package_2" @click="openNavPage('inventory')" class="h-100">-->
<!--              </navigate-icon-item>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div class="col-4 centerNavTallOption">-->
<!--          <button id="scanButton" data-navPageTarget="inventory" @click="openNavPage('inventory')" type="button" data-bs-toggle="modal" data-bs-target="#newItemModel" class="link-secondary primaryNavMovePage btn btn-primary w-100 p-3 rounded-0 rounded-top-5">-->
<!--            <img src="assets/icons/upc-scan.svg" class="w-100" alt="Scan Barcode">-->
<!--          </button>-->
<!--        </div>-->

<!--        <div class="col mt-5 bg-body-secondary">-->
<!--          <div class="row h-100">-->
<!--            <div class="col-12 h-50">-->

<!--            </div>-->
<!--            <div class="col h-50">-->
<!--              <navigate-icon-item @click="openNavPage('recents')" icon-class="bi-arrow-left-right" :badge-text="'recentItemsList.length'+''" class="h-100">-->
<!--              </navigate-icon-item>-->
<!--            </div>-->
<!--            <div class="col h-50">-->
<!--              <navigate-icon-item @click="openNavPage('account')" icon-class="bi-person" class="h-100">-->
<!--              </navigate-icon-item>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </template>-->

<!--    <template #content>-->
<!--      <page-title-table-->
<!--        v-if="appNavigation.currentPage==='home'"-->
<!--        :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"-->
<!--        :jumbotron-title="appInfo.appTitle"-->
<!--        :table-items="[-->
<!--          this.library.filterByType([Category.type]).length,-->
<!--          this.library.filterByType([StoreItem.type]).length,-->
<!--          '#',-->
<!--          ''-->
<!--        ]"-->
<!--      >-->
<!--&lt;!&ndash;        itemsList.filter(item => item.hasLowStock).length&ndash;&gt;-->
<!--        <template #jumbotronsubtext>-->
<!--          <p class="w-100">ConnectionInfo</p>-->
<!--          <p class="">{{appInfo.appVersion}}</p>-->
<!--        </template>-->
<!--      </page-title-table>-->

<!--    </template>-->
<!--  </quasar-app-layout>-->

<!--</template>-->

<style scoped>

</style>

