<script>
import {defineComponent, ref} from "vue";
import RecordItem from "components/RecordItem.vue";
import {RECORD_TYPES} from "src/models/Record";

export default defineComponent({
  name: "Records",
  data() {
    return {
    };
  },
  components: {RecordItem},
  props: {
    recordsList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    RECORD_TYPES() {
      return RECORD_TYPES
    },
    allRecords(){
      return this.recordsList.sort((a, b) => {return a.loggedOn-b.loggedOn});
    },
  }
});
</script>

<template>
  <q-page class="">
    <div class="q-pa-md">

      <q-list bordered padding>
        <Record-Item v-for="(record, i) in allRecords" :key="i"
                           :recordOn="record.recordOn"
                           :forName="record.forName"
                           :byName="record.byName"
                           :record="record.record"
                           :loggedOn="record.loggedOn"
        >
          <div v-if="record.recordType === RECORD_TYPES.NEW">
            <q-item-section class="absolute-center">
              <q-icon name="warning" color="warning" size="4rem" />
              <q-item-label caption lines="2">{{  }}</q-item-label>
            </q-item-section>

          </div>
        </Record-Item>
      </q-list>

    </div>
  </q-page>
</template>
