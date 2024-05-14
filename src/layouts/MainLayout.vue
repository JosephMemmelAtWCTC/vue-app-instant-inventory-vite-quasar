<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import NavigateIconItem from "components/NavigateIconItem.vue";
import { db, auth, storage } from 'src/models/Firebase.js'

import FullUserDetails from "src/models/FullUserDetails";
import OptionsFAB from "components/OptionsFAB.vue";
import EditModal from "components/EditModal.vue";
import StoreItem from "src/models/StoreItem";
import Product from "src/models/Product";

export default defineComponent({
  name: 'MainLayout',
  components: {EditModal, OptionsFAB, NavigateIconItem},
  data(){
    return {
      locationKioskName: "Company",
      leftDrawerOpen: false,
      newItem: new StoreItem(new Product("","","https://picsum.photos/200/300",""), 1, undefined),
    };
  },
  props: {
    authUser: {//TODO: Fully remove userInfo
      // type: Pages,
      type: Object,
      required: true,
    },
    appInfo: {
      type: Object,
      default: {
        appTitle: "Instant Inventory",
        appVersion: "Vue App v#.# (...)",
        sideBarWidth: 180,
      }
    },
    inventoryExplorer: {
      type: Object,
      required: true,
    },
    filterSettings: {
      type: Object,
      required: true,
    },
    notificationsList: {
      type: Array,
      required: true,
    },
    recordsList: {
      type: Array,
      required: true,
    }
  },
  methods: {
    toggleLeftDrawer(){
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  },
  computed: {
    imgSize() {
      return 74/(this.leftDrawerOpen?1:1.5);
    },
    authUserIsAdmin() {
      return this.authUser.role.toLowerCase() === 'admin';
    }
  },
});
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="q-ma-none-forced full-width">
      <q-toolbar class="g-0 p-0 m-0">
        <div class="row justify-between q-ma-none-forced q-gutter-none m-0 p-0">
          <div class="q-pa-none-forced"
               :class="leftDrawerOpen?'col-auto':'col-12'">
            <div class="full-height q-pa-sm position-relative border-1"
                 :style="leftDrawerOpen?'width:'+appInfo.sideBarWidth+'px':''"
                 :class="!leftDrawerOpen?'full-width':''"
            >
              <p class="text-center absolute-center full-width">
                {{ this.locationKioskName }}
              </p>
            </div>
          </div>


          <div class="col-6">
<!--            <q-btn-->
<!--              flat-->
<!--              dense-->
<!--              round-->
<!--              icon="menu"-->
<!--              aria-label="Menu"-->
<!--              @click="toggleLeftDrawer"-->
<!--            />-->

            <q-toolbar-title>
<!--              {{ appNavigation.currentPageLabel }}-->
              {{ appInfo.appTitle }}
            </q-toolbar-title>

          </div>
          <div class="col-auto bg-secondary px-4">
            <Router-Link to="account" v-if="authUser.uid !== ''">
              <div class="full-height q-py-sm">
                <div class="row">
                  <div class="col" v-if="!this.leftDrawerOpen">
                    <span>
<!--                    <q-chip :color="authUser.role+'Color'" text-color="white">-->
                    <q-chip :color="'adminColor'" text-color="white">
                      <span>
                      <q-icon name="bi-person-badge" class="chip-icon" />
                      {{ authUser.role }}
                      </span>
                    </q-chip>
                    </span>
                  </div>
                  <div class="col-auto">
                    <div class="column full-height justify-center">
                      <div class="col">
                        {{authUser.email}}
                      </div>
                      <div class="col" v-if="this.leftDrawerOpen">
                        <span>
<!--                        <q-chip color="colorAdmin" text-color="white">-->
                        <q-chip text-color="white" class="bg-primary">
                          <p class="pb-2">
                          <q-icon name="bi-person-badge" class="chip-icon" />
                          {{ authUser.role }}
                          </p>
                        </q-chip>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-avatar :size="imgSize+'px'" class="q-ml-md">
                      <q-img
                        :src="authUser.image"
                        :spinner-size="(imgSize/2)+'px'"
                        spinner-color="secondary"
                        class="profile-avatar"
                      />
                    </q-avatar>
                  </div>
                </div>
              </div>
            </Router-Link>
            <Router-Link to="login" v-else>
              <div class="full-height q-py-sm">
                <div class="row">
                  <div class="col-auto">
                    <div class="column full-height justify-center">
                      <div class="col">
                        Log In
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Router-Link>
          </div>
        </div>
      </q-toolbar>
    </q-header>

<!-- Sidebar-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="appInfo.sideBarWidth"
      class="overflow-x-hidden"
    >
      <q-list>
        <navigate-icon-item router-link-to="/" tooltip-info="Home" li-extra-classes="p-2 mb-2" icon-class="bi-house">
        </navigate-icon-item>
        <navigate-icon-item router-link-to="/inventory" @click="" tooltip-info="Inventory" li-extra-classes="p-2 mb-2" icon-class="bi-box-seam"><!--fa-solid fa-boxes-stacked-->
        </navigate-icon-item>
        <navigate-icon-item router-link-to="/notifications" tooltip-info="Notifications" li-extra-classes="p-2 mb-2" icon-class="bi-bell" :badge-text="notificationsList.length!==0?notificationsList.length:''">
        </navigate-icon-item>
        <navigate-icon-item router-link-to="/records" tooltip-info="Records" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="recordsList.length">
        </navigate-icon-item>
        <navigate-icon-item router-link-to="/stats" tooltip-info="Statistics" li-extra-classes="p-2 mb-2" icon-class="bi-clipboard2-data" v-if="authUserIsAdmin">
        </navigate-icon-item>
<!--        <navigate-icon-item router-link-to="/account" tooltip-info="Account" li-extra-classes="p-2 mb-2" icon-class="bi-person">-->
<!--        </navigate-icon-item>-->
        <navigate-icon-item router-link-to="/admin" tooltip-info="Admin" li-extra-classes="p-2 mb-2" icon-class="bi-terminal" v-if="authUserIsAdmin">
        </navigate-icon-item>
      </q-list>
        <footer class="sidebar-footer">
          <navigate-icon-item router-link-to="/app" iconContent="Experience Our App" li-extra-classes="p-2 mb-2" icon-class="bi-phone">
          </navigate-icon-item>
        </footer>
    </q-drawer>

    <q-page-container class="overflow-hidden">
      <router-view
        :auth-user="this.authUser"
        :inventory-explorer="this.inventoryExplorer"
        :app-info="this.appInfo"
        :filter-settings="this.filterSettings"
        :notifications-list="this.notificationsList"
        :records-list="this.recordsList"

        :left-drawer-open="leftDrawerOpen"
      />

    </q-page-container>
    <q-footer class="fixed-bottom transparent navigation-footer container-fluid m-0 p-0" v-if="!leftDrawerOpen">

      <div class="row q-gutter-none m-0 p-0 overflow-x-hidden transparent">
        <div class="col-4 spacer-from-top q-gutter-none bg-red h-100">
          <div class="row bg-body-secondary h-100">
            <div class="col-12 h-50">

              <div class="row q-gutter-none " :class="('row-cols-'+(authUserIsAdmin?'3':'2'))">
                <navigate-icon-item disable-hover router-link-to="/" li-extra-classes="p-2 mb-2" class="col" icon-class="bi-house"></navigate-icon-item>
                <navigate-icon-item disable-hover router-link-to="/inventory" @click="" li-extra-classes="p-2 mb-2" class="col" icon-class="bi-box-seam"><!--fa-solid fa-boxes-stacked--></navigate-icon-item>
                <navigate-icon-item disable-hover router-link-to="/stats" li-extra-classes="p-2 mb-2" class="col" icon-class="bi-clipboard2-data" v-if="authUserIsAdmin"></navigate-icon-item>
              </div>
            </div>
          </div>
        </div>

        <div class="col centerNavTallOption">
          <button id="scanButton" type="button" class="link-secondary primaryNavMovePage btn btn-primary w-100 p-3 rounded-0 rounded-top-5 h-100"
                  @click="()=>{
                    if(this.$route.path !== 'inventory'){
                      this.$router.push({ path: '/inventory' });
                    }
                    this.$refs.newItemModal.openModal();
                  }"
          >
            <img src="./assets/icons/upc-scan.svg" class="scan-qr-code" alt="Scan Barcode">
          </button>
        </div>

        <div class="col-4 spacer-from-top q-gutter-none bg-red h-100">
          <div class="row bg-body-secondary h-100">
            <div class="col-12 h-50">
              <div class="row q-gutter-none " :class="('row-cols-'+(authUserIsAdmin?'3':'2'))">
                <navigate-icon-item disable-hover router-link-to="/notifications" li-extra-classes="p-2 mb-2" icon-class="bi-bell" :badge-text="notificationsList.length!==0?notificationsList.length:''"></navigate-icon-item>
                <navigate-icon-item disable-hover router-link-to="/records" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="recordsList.length"></navigate-icon-item>
                <navigate-icon-item disable-hover router-link-to="/admin" li-extra-classes="p-2 mb-2" icon-class="bi-terminal" v-if="authUserIsAdmin"></navigate-icon-item>
              </div>
            </div>
          </div>
        </div>

      </div>

    </q-footer>
  </q-layout>

<!-- Add Item Control via scanner: TODO: Ask if this is best place, it should be separate from it's children -->
  <edit-modal :item="this.newItem"
              title="New Item"
              submit-button-text="Create Item"
              ref="newItemModal"
              @save-it="inventoryExplorer.currentlyIn.addNew(this.newItem)"
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


</template>


<style scoped>
  footer.sidebar-footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .profile-avatar{
    height: 100%;
    //width: auto;
  }
  .q-pa-none-forced{
    padding: 0 0 !important;
  }
  .spacer-from-top{
    margin-top: 10%;
  }

  .because-removing-row-fails{
    padding: 0;
  }

  /*.footer:not(.sidebar-footer){*/
  .navigation-footer{
    //height: 200px;
  }

  img.scan-qr-code{
    width: 100px;
  }

  .navigation-footer .row {
  }

  .transparent{
    pointer-events: none;
  }

  .transparent > *:not(.transparent){
    pointer-events: auto;
  }


  .border-1{
    border-right: #dee2e6 solid 1px;
  }
</style>
