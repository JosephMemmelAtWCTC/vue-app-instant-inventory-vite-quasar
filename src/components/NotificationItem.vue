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
    title: {
      type: String,
      required: true,
    },
  },
  emits: [],
  watch: {
  },
});
</script>

<template>
  <q-item>
    <q-item-section top thumbnail class="q-ml-none">
      <img src="https://cdn.quasar.dev/img/mountains.jpg">
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <q-item-label caption lines="2">Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit elit.</q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label caption>5 min ago</q-item-label>
      <q-icon name="star" color="yellow" />
    </q-item-section>
  </q-item>
  <q-separator spaced inset="item" />
</template>
