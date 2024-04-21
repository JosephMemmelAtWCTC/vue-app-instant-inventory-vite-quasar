<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import InventoryCollection from "src/models/InventoryCollection";
import App from "src/App.vue";

export default defineComponent({
  components: {PageTitleTable},
  props: {
    appNavigation: {
      type: Object,
      required: true,
    },
    library: {
      type: Object,
      required: false,
    }
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
      :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"
      :jumbotron-title="'this.appTitle'"
      :table-items="[this.library.length]">
<!--      :table-items="[this.appNavigation.currentPage]">-->
<!--      :table-items="[this.appNavigation]">-->


<!--                      :table-items="[categoriesList.length, itemsList.length, '#', itemsList.filter(item => item.hasLowStock).length]"-->
      <template #jumbotronsubtext>
        <p class="w-100">ConnectionInfo</p>
        <p class="">{{'appVersion'}}</p>
      </template>
    </page-title-table>


  </q-page>
</template>
