<script>
import MainContentPage from "components/pages/MainContentPage.vue";
import {defineComponent} from "vue";

  export default defineComponent({
  name: "PageMainContentTitle",
  components: {MainContentPage},
  props: {
    mobileDisplay: {
      type: Boolean,
      default: false,
    },
    jumbotronTitle: {
      type: Array,
      required: true,
    },
  },
});
</script>

<template>
  <main-content-page>
    <div v-if="mobileDisplay" class="d-flex align-items-center text-center justify-content-center mt-5 px-4 pb-0">
      <div class="jumbotron m-2 bg-primary rounded-3 border-primary border-5 border">
        <h1 class="display-6 d-none d-md-block p-3 text-secondary fw-bold w-100 px-4">
          <span v-for="(line, i) in jumbotronTitle">
            <br v-if="i !== 0">
            {{ line }}
          </span>
        </h1>
        <br>
        <div class="bg-secondary-subtle p-0 m-0 rounded-1">
          <slot>
          </slot>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="m-2 jumbotron jumbotron-fluid bg-primary d-flex align-items-center text-center mt-5 pb-0">
        <h1 class="display-2 d-col-block p-3 text-secondary fw-bold w-100 pb-0">
          <span v-for="(line, i) in jumbotronTitle">
            <br v-if="i !== 0">
            {{ line }}
          </span>
        </h1>
      </div>
      <slot>
      </slot>
    </div>
</main-content-page>

</template>
