<script>
import {defineComponent, ref} from "vue";
import {STORAGE_TYPES} from "src/models/InventoryItem";
import StatsSubpage from "components/StatsSubpage.vue";

export default defineComponent({
  name: 'Stats',
  components: {StatsSubpage},
  data() {
    return {
      tab: ref('by_type')
    }
  },
  props: {
    library: {
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
  computed: {
    STORAGE_TYPES() {
      return STORAGE_TYPES
    }
  },
});
</script>

<template>
  <q-page>
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      mobile-arrows
      class="bg-primary text-white shadow-2"
    >

      <q-tab name="by_type" icon="bi-code-square" label="Type">
      </q-tab>
      <q-tab name="notifications" icon="bi-exclamation-square" label="Warning Level">
      </q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated>

      <q-tab-panel name="by_type">
        <stats-subpage class="bg-white"
                       title="Inventory by type"
                       label="Item Count"
                       :labels="[ 'Categories', 'Products']"
                       :datasets="[
                            {
                              label: 'Item Count',
                              data: [
                                this.library.filterByType([STORAGE_TYPES.CATEGORY.toLowerCase()]).length,
                                this.library.filterByType(['product']).length,
                              ],
                            }
                          ]"
        >
        </stats-subpage>
      </q-tab-panel>
      <q-tab-panel name="notifications">
        <stats-subpage class="bg-white"
                       title="Notifications"
                       label="Type count"
                       :labels="[ 'Out of stock', 'Reorder level reached']"
                       :datasets="[
                            {
                              label: 'Count',
                              data: [
                                this.notificationsList.filter(n => n.level === 'out_of_stock').sort((a, b) => {return a.lastUpdated-b.lastUpdated}).length,
                                this.notificationsList.filter(n => n.level === 'reorder_level_reached').sort((a, b) => {return a.lastUpdated-b.lastUpdated}).length,
                              ],

                            }
                          ]"
        >
        </stats-subpage>
      </q-tab-panel>

    </q-tab-panels>
  </q-page>
</template>

<style scoped>
  h3{
    font-size: 1em;
  }
  .row > * {
    width: auto;
  }

  /*body div.noflex{
  //  flex-wrap: nowrap;
  //}

  /*canvas{
  //  height: 50%;
  //  background-color: red;
  //}*/
</style>
