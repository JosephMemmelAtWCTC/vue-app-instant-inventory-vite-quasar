<script>
import {defineComponent} from "vue";
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import {STORAGE_TYPES} from "src/models/InventoryItem";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'StatsSubpage',
  components: { Bar },
  data() {
    return {
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    yTicks: {
      type: Number,
      required: false,
      default: 1,
    },
    labels: {
      type: Array,
      required: true,
    },
    datasets: {
      type: Array,
      required: true,
    },

  },
  computed: {
    chartData() {
      return {

        labels: this.labels,
        datasets: this.datasets,
      };
    },
    chartOptions() {
      return {
        responsive: true,
        // https://stackoverflow.com/a/43724904 for scales
        scales: {
          y: {
            ticks: {
              stepSize: this.yTicks,
            }
          }
        },
        // backgroundColor: [
        // TODO: Give customize color prop
        // ],
      }
    }
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
      Error: Chart could not be loaded
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
