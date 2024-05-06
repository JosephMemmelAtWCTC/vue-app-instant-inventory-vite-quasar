<script>
import {defineComponent} from "vue";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {STORAGE_TYPES} from "src/models/InventoryItem";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'Stats',
  components: { Bar },
  data() {
    return {
      title: "Inventory by type"
    }
  },
  props: {
    library: {
      type: Object,
      required: true,
    },
  },
  computed: {
    chartData() {
      return {
        labels: [ 'Categories', 'Products' ],
        datasets: [
          {
            label: 'Item Count',
            data: [
              this.library.filterByType([STORAGE_TYPES.CATEGORY.toLowerCase()]).length,
              this.library.filterByType(["product"]).length,
            ],
            // backgroundColor: [
            // TODO: Give each own header and color
            // ],
          }
        ]
      };
    },
    chartOptions() {
      return {
        title: {
          display: true,
          text: 'Custom Chart Title'
        },
        responsive: true,
        // https://stackoverflow.com/a/43724904 for scales
        scales: {
          y: {
            ticks: {
              stepSize: 1
            }
          }
        },
      }
    }
  },
  mounted() {
  },
});
</script>

<template>
  <q-page class="flex">
    <h3 class="mx-auto">{{ title }}</h3>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
      :title="title"

    >
      Error: Could not be loaded
    </Bar>
  </q-page>
</template>

<style scoped>
  h3{
    font-size: 1em;
  }
  /*canvas{
  //  height: 50%;
  //  background-color: red;
  //}*/
</style>
