<script>
import {defineComponent} from "vue";

import PageTitleTable from "components/pages/PageTitleTable.vue"
import Category from "src/models/Category";
import StoreItem from "src/models/StoreItem";

export default defineComponent({
  data() {
    return {
    };
  },
  components: {},
  props: {
    library: {
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
    Under construction

  </q-page>
</template>
