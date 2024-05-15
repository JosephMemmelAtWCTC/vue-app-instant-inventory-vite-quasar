<script>
import {defineComponent, ref} from "vue";
import {STORAGE_TYPES} from "src/models/InventoryItem";
import StatsSubpage from "components/StatsSubpage.vue";
import {RECORD_ONS, RECORD_TYPES} from "src/models/Record";

export default defineComponent({
  name: 'Stats',
  components: {StatsSubpage},
  data() {
    return {
      tab: ref('records')
    }
  },
  props: {
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
    RECORD_ONS() {
      return RECORD_ONS
    },
    RECORD_TYPES() {
      return RECORD_TYPES
    },
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
      class="bg-primary text-white shadow-2 pt-3"
    >

      <q-tab name="records" icon="bi-list-columns" label="Records"></q-tab>
      <q-tab name="by_type" icon="bi-code-square" label="Type"></q-tab>
      <q-tab name="notifications" icon="bi-exclamation-square" label="Warning Level"></q-tab>
    </q-tabs>
    <q-tab-panels v-model="tab" animated class="keep-whole-in-view mx-auto">

      <q-tab-panel name="by_type">
        <stats-subpage class="bg-white"
                       title="Inventory by type"
                       label="Item Count"
                       :labels="[ 'Categories', 'Products']"
                       :datasets="[
                            {
                              label: 'Item Count',
                              data: [
                                //The manually added number at the end is just to sync it with the database number. There was manual removing of things in firebase as well as some things only having their delete logged but not their create as they were made before that was implemented
                                this.recordsList.filter(
                                  r => r.recordOn === RECORD_ONS.INVENTORY && r.recordType === RECORD_TYPES.NEW && r.record.kind === STORAGE_TYPES.CATEGORY).length
                                   - this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY && r.record.kind === STORAGE_TYPES.CATEGORY && r.recordType === RECORD_TYPES.DELETE).length+4,
                                this.recordsList.filter(
                                  r => r.recordOn === RECORD_ONS.INVENTORY && r.recordType === RECORD_TYPES.NEW && r.record.kind === STORAGE_TYPES.PRODUCT_GENERIC).length
                                   - this.recordsList.filter(r => r.recordOn === RECORD_ONS.INVENTORY && r.record.kind === STORAGE_TYPES.PRODUCT_GENERIC && r.recordType === RECORD_TYPES.DELETE).length+11,
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
                                this.notificationsList.filter(n => n.level === 'out_of_stock').length,
                                this.notificationsList.filter(n => n.level === 'reorder_level_reached').length,
                              ],

                            }
                          ]"
        >
        </stats-subpage>
      </q-tab-panel>
      <q-tab-panel name="records">
        <stats-subpage class="bg-white"
                       title="Records"
                       label="Record count"
                       :labels="[ 'New', 'Update', 'Remove']"
                       :datasets="[
                            {
                              label: 'Count',
                              data: [
                                this.recordsList.filter(r => r.recordType === RECORD_TYPES.NEW).length,
                                this.recordsList.filter(r => r.recordType === RECORD_TYPES.UPDATE).length,
                                this.recordsList.filter(r => r.recordType === RECORD_TYPES.DELETE).length,
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
  .keep-whole-in-view{
    max-width: 125vh;
    margin-bottom: 20px;
  }

  /*body div.noflex{
  //  flex-wrap: nowrap;
  //}

  /*canvas{
  //  height: 50%;
  //  background-color: red;
  //}*/
</style>
