<script>
import {defineComponent, ref} from "vue";
import {notifications} from "src/models/Firebase";

import NotificationItem from "components/NotificationItem.vue";
import Notification from "src/models/Notification.js";

export default defineComponent({
  data() {
    return {
      tab: ref('out_of_stock'),
      // innerTab: ref('innerMails'),
      // splitterModel: ref(20)
      notificationsList: [],
    };
  },
  components: {NotificationItem},
  props: {
    inventoryExplorer: {
      // type: InventoryExplorer,
      type: Object,
      required: true,
    }
  },
  mounted() {
  },
  created: function () {
    notifications.onSnapshot(snapshot => {
      this.notificationsList = [];
      snapshot.forEach(doc => {
        console.log("m docdata:", doc.data());
        const dataPush = doc.data();
        dataPush.docId = doc.id;

        const notification = new Notification(dataPush)
        // console.log("notification.getAsData()",notification.getAsData());

        this.notificationsList.push({
            level: notification.level,
            docId: notification.docId,
            title: notification.title,
            numInStock: notification.numInStock,
            reorderLevel: notification.reorderLevel,
            lastUpdated: notification.lastUpdated,
            image: notification.image,
          }
        );
      });
    })
  },
  computed: {
    allOutOfStock(){
      // return this.notificationsList.filter(n => n.type === "out_of_stock");
      return this.notificationsList.filter(n => n.level === "out_of_stock");
    }
  }
});


</script>


<template>
  <q-page class="">
    <div class="q-pa-md">
      <div class="q-gutter-y-md">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="out_of_stock" label="Out of Stock" />
            <q-tab name="reorder_level_reached" label="Reorder Level Reached" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
<!--            MAKE EACH A COMPONENT-->
            <q-tab-panel name="out_of_stock">
              <div class="text-h6">Out Of Stock</div>

              <div class="q-pa-md">
                <q-list bordered padding>
                  <Notification-Item v-for="(notification, i) in allOutOfStock" :key="i"
                                    :title="notification.title"
                  >
                    test
                  </Notification-Item>
                </q-list>
              </div>

            </q-tab-panel>

<!--            <q-tab-panel name="alarms">-->
<!--              <div class="text-h6">Alarms</div>-->
<!--              Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
<!--            </q-tab-panel>-->

<!--            <q-tab-panel name="movies">-->
<!--              <div class="text-h6">Movies</div>-->
<!--              Lorem ipsum dolor sit amet consectetur adipisicing elit.-->
<!--            </q-tab-panel>-->
          </q-tab-panels>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<style>//TODO: Also ask why scoped does not work
  .q-tabs__content.scroll--mobile.row.no-wrap.items-center.self-stretch.hide-scrollbar.relative-position.q-tabs__content--align-justify{
    background-color: Red !important;
    width: auto !important;
    flex-wrap: nowrap !important;
  }
</style>
