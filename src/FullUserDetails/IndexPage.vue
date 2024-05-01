<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";

export default defineComponent({
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
    appNavigation: {
      type: Object,
      required: true,
    },
    library: {
      type: Object,
      required: false,
    },
    appInfo: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    // console.log('appNavigation:', this.appNavigation2);
    console.log('appNavigation:', this.appNavigation);
  }
});
</script>


<template>
  <q-page class="flex flex-center">
    <page-title-table
      v-if="appNavigation.currentPage==='home'"
      :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"
      :jumbotron-title="appInfo.appTitle"
      :table-items="[
        this.library.filterByType([Category.type]).length,
        this.library.filterByType([StoreItem.type]).length,
        '#',
        ''
      ]"
    >
<!--        itemsList.filter(item => item.hasLowStock).length-->
      <template #jumbotronsubtext>
        <p class="w-100">ConnectionInfo</p>
        <p class="">{{appInfo.appVersion}}</p>
      </template>
    </page-title-table>

  </q-page>
</template>
