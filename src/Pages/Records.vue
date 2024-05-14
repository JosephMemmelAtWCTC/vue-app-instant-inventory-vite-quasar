<script>
import {defineComponent, ref} from "vue";
import RecordItem from "components/RecordItem.vue";
import {RECORD_ONS, RECORD_TYPES} from "src/models/Record";
import TogglesArray from "components/TogglesArray.vue";

export default defineComponent({
  name: "Records",
  data() {
    return {
      filterSettings: {
        toggles: [
          {
            label: "Inventory",
            state: true
          },{
            label: "Accounts",
            state: true
          },{
            label: "Add",
            state: true
          },{
            label: "Update",
            state: true
          },{
            label: "Remove",
            state: true
          },
        ],
        searchString: "",
      },
    };
  },
  components: {TogglesArray, RecordItem},
  props: {
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
    allRecords(){
      // this.recordsList.sort((a, b) => {console.log("a.loggedOn - b.loggedOn",a.loggedOn - b.loggedOn);return a.loggedOn - b.loggedOn});
      this.recordsList.sort((a, b) => {console.log("a.loggedOn - b.loggedOn",a.loggedOn - b.loggedOn);return 1});
      console.log("sorted AllRecords", this.recordsList)

      return this.recordsList;//this.recordsList.sort((a, b) => {return a.loggedOn-b.loggedOn});

    },
  }
});
</script>

<template>
  <q-page class="">
    <div class="q-pa-md">
      <toggles-array :options="filterSettings.toggles">
      </toggles-array>
      <q-list bordered padding>
        <Record-Item v-for="(record, i) in allRecords"
                           :recordOn="record.recordOn"
                           :forName="record.forName"
                           :byName="record.byName"
                           :record="record.record"
                           :loggedOn="record.loggedOn"
        >
          <q-item-section class="absolute-center">
            <div v-if="record.recordType === RECORD_TYPES.NEW">
              <q-icon name="fa-solid fa-file-circle-plus" color="info" size="4rem">
                <q-badge color="primary" floating>+ {{ record.record.added }}</q-badge>
              </q-icon>
              <q-item-label caption lines="2">New item</q-item-label>
            </div>
<!--            fa-arrow-left-to-bracket is pro in fontawesome but not the right-->

            <div v-else-if="record.recordType === RECORD_TYPES.UPDATE">
              <div v-if="record.record.changedStockLevel"><!--If update changed stock level-->
                <q-icon :name="'fa-solid fa-arrow-'+(record.record.changedStockLevel > 0? 'right':'left')+''" color="info" size="4rem">
                  <q-badge color="primary" floating>{{ record.record.changedStockLevel > 0?'+':'-' + ' ' + Math.abs(record.record.changedStockLevel) }}</q-badge>
                </q-icon>
                <q-item-label caption lines="2">{{ record.record.changedStockLevel > 0?'Added '+Math.abs(record.record.changedStockLevel)+' to':'Removed '+Math.abs(record.record.changedStockLevel)+' from'}} stock</q-item-label>

              </div>

            </div>

            <div v-else-if="record.recordType === RECORD_TYPES.DELETE">
                <q-icon name="fa-solid fa-trash-can" color="info" size="4rem">
                </q-icon>
                <q-item-label caption lines="2">Removed {{ record.record.for }}</q-item-label>
            </div>

            <!--              <i class=""></i>-->

              <!-- v-if="record.recordOn === RECORD_ONS.INVENTORY"/>-->
          </q-item-section>

        </Record-Item>
      </q-list>

    </div>
  </q-page>
</template>
