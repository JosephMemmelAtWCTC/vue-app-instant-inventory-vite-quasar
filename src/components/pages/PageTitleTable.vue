<script>
import MainContentPage from "components/pages/MainContentPage.vue";
import {defineComponent} from "vue";

  export default defineComponent({
  name: "PageTitleTable",
  components: {MainContentPage},
  data() {
    return {
    };
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    tableItems: {
      type: Array,
      required: true,
    },
    jumbotronTitle: {
      type: String,
      required: true,
    },
  },
  created() {
  },
  emits: [],
  watch: {
  },
});
</script>

<template>
  <main-content-page>
    <div class="m-2 jumbotron jumbotron-fluid bg-primary d-flex align-items-center text-center mt-5 pb-0">
      <h1 class="display-2 d-md-none d-col-block p-3 text-secondary fw-bold w-100 pb-0">{{jumbotronTitle}}</h1>
    </div>
    <div class="d-flex align-items-center text-center justify-content-center mt-5 px-4 pb-0">
      <div class="jumbotron m-2 bg-primary rounded-3 border-primary border-5 border">
        <h1 class="display-6 d-none d-md-block p-3 text-secondary fw-bold w-100 px-4">{{jumbotronTitle}}</h1>
        <br>
          <div class="bg-secondary-subtle p-0 m-0">
            <slot>
            </slot>
          </div>
      </div>

    </div>
    <div class="w-100 justify-content-center bg-secondary my-auto mb-0 rounded-2">
      <div class="mt-5 mx-auto m-4 p-2">
        <table class="table">
          <thead>
          <tr>
            <th v-for="(header, i) in headers" :key="i" scope="col">
            {{ header }}
          </th>
          </tr>
        </thead>
        <tbody>
        <tr>
          <!--                        <th scope="row"></th>-->
          <td v-for="(item, i) in tableItems" :key="i" class="text-center">
          {{ item }}
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</main-content-page>

</template>
