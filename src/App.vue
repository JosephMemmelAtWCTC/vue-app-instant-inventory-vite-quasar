<!--<template>-->
<!--  <router-view-->
<!--    :appNavigation="{currentPage: 'home'}"-->
<!--    :library="library"/>-->
<!--</template>-->
<!--    :appNavigation="appNavigation"-->

<script>
import {defineComponent} from "vue";
// @ = src

import QuasarAppLayout from "./components/structure/QuasarAppLayout.vue"
import NavigateIconItem from "./components/NavigateIconItem.vue"

import InventoryCollection from "./models/InventoryCollection.js"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"

// import { InventoryCollection, StoreItem, Category, Product } from "@/models/app-modals.js"
// import { InventoryCollection, StoreItem, Category, Product } from "@/js/models/app-models.js"

export default defineComponent({
  components: {QuasarAppLayout, NavigateIconItem},
  data() {
    return {
      library: new InventoryCollection()
        .add(new Category('Category 1','Category 1\'s description', '/staticImages/folder.svg'))
        .add(new StoreItem(
          new Product(
            'Fjallraven - Foldsack No. 1 Backpack',
            'Your perfect pack for everyday use and walks in the forest.',
            'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            '923087'
          ), 2, 4, Date.now() - 1000 * 60 * 60 * 9)
        ),

      appInfo: {
        appVersion: "Vue App v3.0 (Demo)",
      },
      appPageConfigSettings: {
        profileName: "Test Testerson",
        customName: "Custom Name",
      },
      appNavigation: {
        currentPage: "home",
      }
    }
  },
  computed: {
    computedCurrentPageTitle() {
      return this.appNavigation.currentPage.charAt(0).toUpperCase() + this.appNavigation.currentPage.slice(1);
    }
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
          <navigate-icon-item tooltip-info="Recents" @click="openNavPage('recents')" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="'recentItemsList.length'+''">
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


  </quasar-app-layout>

</template>
