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

import InventoryCollection from "./models/InventoryCollection.js"
import Category from "./models/Category.js"
import StoreItem from "./models/StoreItem.js"
import Product from "./models/Product.js"

// import { InventoryCollection, StoreItem, Category, Product } from "@/models/app-modals.js"
// import { InventoryCollection, StoreItem, Category, Product } from "@/js/models/app-models.js"

export default defineComponent({
  components: {QuasarAppLayout},
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
  <quasar-app-layout :current-page-title="computedCurrentPageTitle">

  </quasar-app-layout>
</template>
