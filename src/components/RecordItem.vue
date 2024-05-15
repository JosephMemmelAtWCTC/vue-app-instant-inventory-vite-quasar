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
    dateFormat: {
      type: String,
      required: false,
      default: "M-D-Y",
    },
    changeRecord: {
      type: Object,
      required: false,
    },
  },
  emits: [],
  watch: {
  },
  computed: {
    formattedDate(){//TODO: Have passed in as prop with default
      const loggedOnLocal = new Date(this.loggedOn);

      let formattedMinutes = loggedOnLocal.getMinutes()+"_"; //Using a non-number character to avoid js treating adding "0" as 0
      while(formattedMinutes.length < 3){
        formattedMinutes = "0"+formattedMinutes;
      }
      formattedMinutes = formattedMinutes.substring(0,formattedMinutes.length-1);


      // Formatting idea by https://stackoverflow.com/a/29323931
      return this.dateFormat
        .replace('Y', loggedOnLocal.getFullYear())
        .replace('M', loggedOnLocal.getMonth()+1)
        .replace('D', loggedOnLocal.getDate())
        .replace('h', loggedOnLocal.getHours())
        .replace('m', formattedMinutes)
        .replace('s', loggedOnLocal.getSeconds());
    }
  },
});
</script>

<template>
  <q-item class="m-1 notification-row">
    <div class="row">
      <div class="col relative-position">
        <slot>
        </slot>
      </div>
      <div class="col relative-position">
        <q-item-section class="absolute-center">
          <q-item-label>{{ forName }}</q-item-label>
          <q-item-label caption lines="2">{{  }}</q-item-label>
        </q-item-section>
      </div>
      <div class="col relative-position">
        <q-item-section side top class="absolute-center">
          <q-item-label caption> {{ byName }}</q-item-label>
        </q-item-section>
      </div>
      <div class="col relative-position">
        <q-item-section side top class="absolute-center">
          <q-item-label caption>{{ formattedDate }}</q-item-label>
        </q-item-section>
      </div>
      <div class="col relative-position">
        <q-item-section side top class="full-width full-height">
          <code class="p-2 bg-secondary-subtle full-width full-height rounded-1">
            {{ changeRecord }}
          </code>
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
