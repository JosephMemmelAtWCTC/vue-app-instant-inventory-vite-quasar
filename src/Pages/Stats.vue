<script>
import {defineComponent} from "vue";
import {STORAGE_TYPES} from "src/models/InventoryItem";
import StatsSubpage from "components/StatsSubpage.vue";

export default defineComponent({
  name: 'Stats',
  components: {StatsSubpage},
  data() {
    return {
      title: "Inventory by type",
    }
  },
  props: {
    library: {
      type: Object,
      required: true,
    },
  },
  computed: {
    STORAGE_TYPES() {
      return STORAGE_TYPES
    }
  },
});
</script>

<template>
  <q-page class="flex">
    <stats-subpage title="Inventory by type"
                   label="Item Count"
                   :datasets="[
                      {
                        label: 'Item Count',
                        data: [
                          this.library.filterByType([STORAGE_TYPES.CATEGORY.toLowerCase()]).length,
                          this.library.filterByType(['product']).length,
                        ],
                      }
                    ]"
                   :labels="[ 'Categories', 'Products']"
    >
    </stats-subpage>

  </q-page>
</template>

<style scoped>
  h3{
    font-size: 1em;
  }
  /*canvas{
  //  height: 50%;
  //  background-color: red;
  //}*/
</style>
