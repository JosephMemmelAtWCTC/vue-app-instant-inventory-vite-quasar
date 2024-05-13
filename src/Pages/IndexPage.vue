<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";

export default defineComponent({
  data() {
    return {
    }
  },
  // TODO: Ask about computed appearing
  computed: {
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
      :headers="['Categories', 'Items', 'Total Stock', 'Completely Out of Stock', 'Total Needing Refill', 'Records']"
      :jumbotron-title="appInfo.appTitle"
      :table-items="[
        // this.library.filterByType([Category.type]).length,
        // this.library.filterByType([StoreItem.type]).length,
        // this.library.filterByType(['product']).length,
        '#',
        '#',
        '#',
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
