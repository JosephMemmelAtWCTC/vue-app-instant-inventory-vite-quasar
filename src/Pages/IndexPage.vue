<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";
import {inventory} from "src/models/Firebase";
import {RECORD_ONS, RECORD_TYPES} from "src/models/Record";

export default defineComponent({
  methods: {inventory},
  data() {
    return {
    }
  },
  // TODO: Ask about computed appearing
  computed: {
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
      :headers="['Total Paths', 'Completely Out of Stock', 'Total Needing Refill', 'Records']"
      :jumbotron-title="appInfo.appTitle"
      :table-items="[
        // this.library.filterByType([Category.type]).length,
        // this.library.filterByType([StoreItem.type]).length,
        // this.library.filterByType(['product']).length,
        this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY).filter(r => r.recordType === RECORD_TYPES.NEW).length - this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY).filter(r => r.recordType === RECORD_TYPES.DELETE).length,
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
