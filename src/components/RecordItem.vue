<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "RecordItem",
  components: {},
  data(){
    return {
    }
  },
  props: {
    recordOn: {
      type: String,
      required: true,
    },
    forName: {
      type: String,
      required: true,
    },
    byName: {
      type: String,
      required: true,
    },
    record: {
      type: Object,
      required: false,
      default: {},
    },
    loggedOn: {
      type: Number,
      required: true,
    },
  },
  emits: [],
  watch: {
  },
  computed: {
  },
});
</script>

<template>
  <q-item class="m-1 notification-row">
    <div class="row row-cols-6">
      <div class="relative-position">
        <slot>
        </slot>
      </div>
      <div class="relative-position">
        <q-item-section class="absolute-center">
          <q-item-label>{{ forName }}</q-item-label>
          <q-item-label caption lines="2">{{  }}</q-item-label>
        </q-item-section>
      </div>
      <div class="relative-position">
        <q-item-section side top class="absolute-center">
          <q-item-label caption> By {{ byName }}</q-item-label>
        </q-item-section>
      </div>
      <div class="relative-position">
        <q-item-section side top class="absolute-center">
          <q-item-label caption>{{ new Date(loggedOn).toTimeString() }})</q-item-label>
        </q-item-section>
      </div>

    </div>
  </q-item>
<!--  <q-separator spaced inset="item" />-->
</template>

<style scoped>
  .thumbnail-square{
    height: 100%;
    width: auto;
  }
  .notification-row{
    height: 7em;
  }
</style>
