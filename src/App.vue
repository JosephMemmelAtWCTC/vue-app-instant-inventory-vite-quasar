<template>
  <router-view
    :auth-user="this.authUser"
    :library="this.library"
    :inventory-explorer="this.inventoryExplorer"
    :app-info="this.appInfo"
    :notifications-list="this.notificationsList"
  />
<!--  @call-filter-settings-refresh="console.log('{{{{{{{')"-->

</template>
<!--    :library="library"-->
<!--    :appNavigation="appNavigation"-->
<!--    :appNavigation="{currentPage: 'home'}"-->

<script>
import {defineComponent} from "vue";

import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";//TODO: Ask about repeating imports

import User from "/src/models/FullUserDetails.js"
import FullUserDetails from "/src/models/FullUserDetails.js";

import {accounts, auth, db, inventory, notifications, storage} from "src/models/Firebase.js";



import NavigateIconItem from "components/NavigateIconItem.vue"
import EditModal from "components/EditModal.vue";
import OptionsFAB from "components/OptionsFAB.vue";


import PageTitleTable from "components/pages/PageTitleTable.vue";


import InventoryCollection from "./models/InventoryCollection.js"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"
import InventoryExplorer from "src/models/InventoryExplorer";
import Notification from "src/models/Notification";

export default defineComponent({

  data() {
    return {
      authUser: new FullUserDetails(),

      library: new InventoryCollection(),
      inventoryExplorer: new InventoryExplorer(),

      notificationsList: [],

      appInfo: {
        appTitle: "Instant Inventory",
        appVersion: "Vue App v4.0 (Demo)",
        sideBarWidth: 180,
      },

    }
  },

  methods: {
    handleFilterSettingsRefresh() {
      console.log('Received call-filter-settings-refresh event');
      // Handle the event here
    },
    setLibraryFromDocPath(categoryPath){
      console.log("setLibraryFromDocPath starting...");

    /*   Structure will be category holding other categories and lists of item references
    // TODO: ASK ABOUT BEST STRUCTURE !!!
    Should include list of unique words to aid in searching, store in 2 places?
    */

      const newDisplayLibrary = new InventoryCollection();

      newDisplayLibrary.setFirebaseDoc();

      this.library = newDisplayLibrary;
      return "";
    },
  },
  created() {
    // this.inventoryExplorer = new InventoryExplorer();

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

    notifications.onSnapshot(snapshot => {
      this.notificationsList = [];
      snapshot.forEach(doc => {
        console.log("m docdata:", doc.data());
        const dataPush = doc.data();
        dataPush.docId = doc.id;


        console.log("=====", dataPush)
        const notification = new Notification(dataPush)
        // console.log("notification.getAsData()",notification.getAsData());

        this.notificationsList.push({
            level: notification.level,
            docId: notification.docId,
            title: notification.title,
            numInStock: notification.numInStock,
            reorderLevel: notification.reorderLevel,
            lastUpdated: notification.lastUpdated,
            image: notification.image,
          }
        );
      });
    })

  },

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

