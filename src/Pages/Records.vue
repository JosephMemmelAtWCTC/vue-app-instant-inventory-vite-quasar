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
    notificationsList: {
      type: Array,
      required: true,
    },
  },
  computed: {
  }
});
</script>

<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      TEST4689
    </div>
  </q-page>
</template>
