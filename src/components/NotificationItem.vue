<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "NotificationItem",
  components: {},
  data(){
    return {
    }
  },
  props: {
    level: {
      type: String,
      required: true,
    },
    docId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    numInStock: {
      type: String,
      required: true,
    },
    reorderLevel: {
      type: Number,
      required: true,
    },
    lastUpdated: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    warningIcon: {
      type: String,
      required: false,
      default: "bi-exclamation-circle",
    },
    warningColor: {
      type: String,
      required: false,
      default: "primary",
    },
    warningText: {
      type: String,
      required: false,
    },
  },
  emits: [],
  watch: {
  },
  computed: {
    calculatedTimeAgo(){
      let remainingSecondsAgo = Math.floor((new Date() - new Date(this.lastUpdated)) / 1000);
      const hoursAgo = Math.floor(remainingSecondsAgo / (60 * 60));
      remainingSecondsAgo -= hoursAgo * 60 * 60;
      const minutesAgo = Math.floor(remainingSecondsAgo / 60);
      // remainingSecondsAgo -= minutesAgo * 60;
      return `${hoursAgo}h ${minutesAgo}m ago`;// ${remainingSecondsAgo}s`;
    }
  },
});
</script>

<template>
  <q-item class="m-1 notification-row">
    <div class="row row-cols-4">
      <div class="relative-position">
        <q-item-section top thumbnail class="q-ml-none absolute-center thumbnail-square">
          <img :src="image" :alt="title+'s thumbnail'" class="thumbnail-square">
        </q-item-section>
      </div>
      <div class="relative-position">
        <q-item-section class="absolute-center">
          <q-item-label>{{ title }}</q-item-label>
          <q-item-label caption lines="2">{{  }}</q-item-label>
        </q-item-section>
      </div>
      <div class="relative-position">
        <q-item-section side top class="absolute-center">
          <q-item-label caption>{{ calculatedTimeAgo }}</q-item-label>
        </q-item-section>
      </div>
      <div class="relative-position">
        <q-item-section side top class="absolute-center">
          <q-icon :name="warningIcon" :color="warningColor">
            <span class="ms-2">{{ warningText }}</span>
          </q-icon>
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
