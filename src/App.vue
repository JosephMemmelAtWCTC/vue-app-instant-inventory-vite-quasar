<template>
  <router-view
    :auth-user="this.authUser"
    :inventory-explorer="this.inventoryExplorer"
    :app-info="this.appInfo"
    :notifications-list="this.notificationsList"
    :records-list="this.recordsList"
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

import {accounts, auth, db, inventory, notifications, storage, records} from "src/models/Firebase.js";



import NavigateIconItem from "components/NavigateIconItem.vue"
import EditModal from "components/EditModal.vue";
import OptionsFAB from "components/OptionsFAB.vue";


import PageTitleTable from "components/pages/PageTitleTable.vue";


import InventoryCollection from "./models/InventoryCollectionProper"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"
import InventoryExplorer from "src/models/InventoryExplorer";
import Notification from "src/models/Notification";
import {Record} from "src/models/Record";

export default defineComponent({

  data() {
    return {
      authUser: new FullUserDetails(),

      inventoryExplorer: new InventoryExplorer(),

      notificationsList: [],
      recordsList: [],

      appInfo: {
        appTitle: "Example Company's Instant Inventory",
        appVersion: "Vue App 5.0 (Beta-Testing)",
        clientCompany: "Example Company",
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

      // newDisplayLibrary.navigateTo("root");

      this.library = newDisplayLibrary;
      return "";
    },
  },
  created() {
    // this.inventoryExplorer = new InventoryExplorer();

    // TODO: check for signed in user
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
        this.inventoryExplorer.setUser(this.authUser);
        // TODO: Check if first time signed in and make data
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


    // this.setLibraryFromDocPath("/");

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
    });

    records.orderBy("loggedOn").onSnapshot(snapshot => {
      this.recordsList = [];
      snapshot.forEach(doc => {
        const dataPush = doc.data();
        dataPush.docId = doc.id;

        const record = new Record(dataPush);

        this.recordsList.push(record.getAsData());
      });

      console.log("records.onSnapshot recordsList: ", this.recordsList);
    });

  },

})
</script>

<style scoped>

</style>

