<script>
  import {defineComponent} from "vue";
  import MainContentPage from "components/pages/MainContentPage.vue";
  import TogglesArray from "components/TogglesArray.vue";
  import ResultsPossiblyEmpty from "components/pages/ResultsPossiblyEmpty.vue";
  import CardsList from "components/CardsList.vue";

  export default defineComponent({
    props: {
      searchLabel: {
        type: String,
        default: "Search",
      },
      currentCombinedItemsList: {
        type: Array,
        required: true,
      },
      breadCrumbs: {
        type: Object,
        required: false,
      },
      filterSettings: {
        type: Object,
        required: true,
      },
    },
    emits: ['save-it','remove-category', 'remove-item','card-navigate'],
    methods: {

    },
  });
</script>

