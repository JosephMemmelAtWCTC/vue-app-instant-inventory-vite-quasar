<script>
import {defineComponent, ref} from "vue";
import NotificationItem from "components/NotificationItem.vue";

export default defineComponent({
  name: "Records",
  data() {
    return {
    };
  },
  components: {NotificationItem},
  props: {
    recordsList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    allRecords(){
      return this.recordsList.sort((a, b) => {return a.loggedOn-b.loggedOn});
    },
  }
});
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      TEST4689



      <q-list bordered padding>
        <Notification-Item v-for="(notification, i) in allRecords" :key="i"
                           :level="notification.level"
                           :docId="notification.docId"
                           :title="notification.title"
                           :numInStock="notification.numInStock"
                           :reorderLevel="notification.reorderLevel"
                           :lastUpdated="notification.lastUpdated"
                           :image="notification.image"
                           warning-icon="bi-exclamation-triangle-fill"
                           warning-color="danger"
                           warning-text="Out of stock"
        >
        </Notification-Item>
      </q-list>

    </div>
  </q-page>
</template>
