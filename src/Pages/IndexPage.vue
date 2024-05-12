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
    library: {
      type: Object,
      required: true,
    },
    appInfo: {
      type: Object,
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
      :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"
      :jumbotron-title="appInfo.appTitle"
      :table-items="[
        this.library.filterByType([Category.type]).length,
        // this.library.filterByType([StoreItem.type]).length,
        this.library.filterByType(['product']).length,
        '#',
        ''
      ]"
    >
      <!--        itemsList.filter(item => item.hasLowStock).length-->
      <h1 class="w-100">Built for {{ this.appInfo.clientCompany }}</h1>
<!--      <p class="w-100">ConnectionInfo</p>-->
      <p class="">{{ appInfo.appVersion }}</p>
    </page-title-table>

  </q-page>
</template>
