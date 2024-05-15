<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";
import {inventory} from "src/models/Firebase";
import {RECORD_ONS, RECORD_TYPES} from "src/models/Record";
import {STORAGE_TYPES} from "src/models/InventoryItem";

export default defineComponent({
  methods: {inventory},
  data() {
    return {
    }
  },
  // TODO: Ask about computed appearing
  computed: {
    STORAGE_TYPES() {
      return STORAGE_TYPES
    },
    RECORD_ONS() {
      return RECORD_ONS
    },
    RECORD_TYPES() {
      return RECORD_TYPES
    },
    StoreItem() {
      return StoreItem
    },
    Category() {
      return Category
    }
  },
  components: {PageTitleTable},
  props: {
    appInfo: {
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
    },
  },
  mounted() {
  }
});
</script>


<template>
  <q-page class="flex flex-center">
    <page-title-table
      :headers="['Categories', 'Products', 'Completely Out of Stock', 'Total Needing Refill', 'Records']"
      :jumbotron-title="appInfo.appTitle"
      :table-items="[
        // this.library.filterByType([Category.type]).length,
        // this.library.filterByType([StoreItem.type]).length,
        // this.library.filterByType(['product']).length,
        this.recordsList.filter(
          r => r.recordOn === RECORD_ONS.INVENTORY && r.recordType === RECORD_TYPES.NEW && r.record.kind === STORAGE_TYPES.CATEGORY).length
           - this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY && r.record.kind === STORAGE_TYPES.CATEGORY && r.recordType === RECORD_TYPES.DELETE).length+4,//The manually added number at the end is just to sync it with the database number. There was manual removing of things in firebase as well as some things only having their delete logged but not their create as they were made before that was implemented
        this.recordsList.filter(
          r => r.recordOn === RECORD_ONS.INVENTORY && r.recordType === RECORD_TYPES.NEW && r.record.kind === STORAGE_TYPES.PRODUCT_GENERIC).length
           - this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY && r.record.kind === STORAGE_TYPES.PRODUCT_GENERIC && r.recordType === RECORD_TYPES.DELETE).length+11,//The manually added number at the end is just to sync it with the database number. There was manual removing of things in firebase as well as some things only having their delete logged but not their create as they were made before that was implemented

        this.notificationsList.filter(n => n.level === 'out_of_stock').sort((a, b) => {return a.lastUpdated-b.lastUpdated}).length,
        this.notificationsList.length,
        this.recordsList.length,
      ]"
    >
      <!--        itemsList.filter(item => item.hasLowStock).length-->
      <h1 class="w-100">Built for {{ this.appInfo.clientCompany }}</h1>
<!--      <p class="w-100">ConnectionInfo</p>-->
      <p class="">{{ appInfo.appVersion }}</p>
    </page-title-table>

  </q-page>
</template>
