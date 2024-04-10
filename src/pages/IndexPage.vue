<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"

export default defineComponent({
  components: {PageTitleTable},
  props: {
    appNavigation: {
      type: Object,
      required: true,
    }
  },
  mounted() {
    console.log('appNavigation:', this.appNavigation);
  }
});
</script>


<template>
  {{ appNavigation }}
  <q-page class="flex flex-center"
          v-if="appNavigation.currentPage==='home'">
    <page-title-table
      :headers="['Categories', 'Items', 'Total Stock', 'Needs Refill']"
      :jumbotron-title="'this.appTitle'"
    >

      <!--                :table-items="[categoriesList.length, itemsList.length, '#', itemsList.filter(item => item.hasLowStock).length]"-->
      <template #jumbotronsubtext>
        <p class="w-100">ConnectionInfo</p>
        <p class="">{{'appVersion'}}</p>
      </template>
    </page-title-table>


  </q-page>
</template>
