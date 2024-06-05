<template>
  <router-view
    :auth-user="this.authUser"
    :inventory-explorer="this.inventoryExplorer"
    :app-info="this.appInfo"
    :notifications-list="this.notificationsList"
    :records-list="this.recordsList"
    :location-kiosk-name="this.locationKioskName"
    @update-kiosk-name="console.log('$event ',$event);this.locationKioskName = $event"
  />
<!--  @update-kiosk-name="console.log('$event', $event)"-->


</template>

<script>
import {defineComponent} from "vue";

import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";

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
import KIOSK_LOCATION_KEY from "pages/ProfilePage.vue";

export default defineComponent({

  data() {
    return {
      authUser: new FullUserDetails(),

      inventoryExplorer: new InventoryExplorer(),

      notificationsList: [],
      recordsList: [],

      appInfo: {
        appTitle: "Company's Instant Inventory",
        appVersion: "Vue App (Submission Candidate)",
        clientCompany: "Company",
        sideBarWidth: 180,
      },
      locationKioskName: null,
    }
  },

  methods: {
    setLibraryFromDocPath(categoryPath){
      console.log("setLibraryFromDocPath starting...");

      const newDisplayLibrary = new InventoryCollection();

      // newDisplayLibrary.navigateTo("root");

      this.library = newDisplayLibrary;
      return "";
    },
    manuallyCallWatchedKioskName(newValue){
      localStorage.setItem("KIOSK_LOCATION_KEY", newValue);
    },
  },
  created() {
    // this.inventoryExplorer = new InventoryExplorer();

    // Check for signed in user
    auth.onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        this.authUser = new FullUserDetails(new User(user));
        accounts.doc(this.authUser.uid).get()
          .then((supplementalAccountDoc) => {
            const supplementalData = supplementalAccountDoc.data();
            this.authUser.image = supplementalData.image ?? null;
            this.authUser.role = supplementalData.role ?? null;

            if(this.authUser.role === 'DISABLED'){
              console.log("disabled@company.com");
              this.$router.push({ path: '/login' });
              auth.signOut().then(()=>{
                console.log('Signed Out');
                // this.$q.notify(`You have been signed out, to reach the login screen again, refresh the page.`)
              }, function(error) {
                console.error('Sign Out Error', error);
              });
            }else if(this.authUser.role !== "ADMIN" && this.$route.path === 'admin'){
                this.$router.push({ path: '/' });
            }
          });
        console.log('Signed in as: ', user);


        this.inventoryExplorer.setUser(this.authUser);

      } else {
        // User is signed out.
        console.log('Not signed in.');

        this.authUser = new FullUserDetails();
        // this.$router.push({ path: '/login' });

      }

      const kioskName = localStorage.getItem("KIOSK_LOCATION_KEY");
      if(kioskName){
        this.locationKioskName = kioskName;
      }else{
        this.locationKioskName = "Kiosk";
      }
      console.log('localStorage.getItem("KIOSK_LOCATION_KEY")',this.locationKioskName);
      this.manuallyCallWatchedKioskName(this.locationKioskName);
    });

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
  watch: {
    locationKioskName: {
      handler() {
        console.log("kioskName CHANGED")
        localStorage.setItem("KIOSK_LOCATION_KEY", this.locationKioskName);
      },
    },
  },

})
</script>

<style scoped>

</style>

