<script>
import {defineComponent, ref} from "vue";

export default defineComponent({
  data() {
    return {
      tab: ref('out_of_stock'),
      // innerTab: ref('innerMails'),
      // splitterModel: ref(20)
    };
  },
  components: {},
  props: {
    inventoryExplorer: {
      // type: InventoryExplorer,
      type: Object,
      required: true,
    }
  },
  mounted() {
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
                  <q-item>
                    <q-item-section top thumbnail class="q-ml-none">
                      <img src="https://cdn.quasar.dev/img/mountains.jpg">
                    </q-item-section>

                    <q-item-section>
                      <q-item-label>Single line item</q-item-label>
                      <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
                    </q-item-section>

                    <q-item-section side top>
                      <q-item-label caption>5 min ago</q-item-label>
                      <q-icon name="star" color="yellow" />
                    </q-item-section>
                  </q-item>
                  <q-separator spaced inset="item" />


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
