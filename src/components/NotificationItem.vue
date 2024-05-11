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
  <q-item>
    <div class="row row-cols-4">
      <div class="">
        <q-item-section top thumbnail class="q-ml-none">
          <img src="https://cdn.quasar.dev/img/mountains.jpg">
        </q-item-section>
      </div>
      <div class="">
        <q-item-section>
          <q-item-label>{{ title }}</q-item-label>
          <q-item-label caption lines="2">{{  }}</q-item-label>
        </q-item-section>
      </div>
      <div class="">
        <q-item-section side top>
          <q-item-label caption>{{ calculatedTimeAgo }}</q-item-label>
        </q-item-section>
      </div>
      <div class="">
        <q-item-section side top>
          <q-icon name="warning" color="danger" />
        </q-item-section>
      </div>
    </div>
  </q-item>
  <q-separator spaced inset="item" />
</template>
