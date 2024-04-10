<script>
  import {defineComponent} from "vue";
  import ToggleItem from "components/ToggleItem.vue";

  export default defineComponent({
  name: "TogglesArray",
  components: {ToggleItem},
  props: {
    options:{
      type: Array,
      required: true,
    },
    // label:{
    //     type: String,
    //     default: "Toggle Me!"
    // }
  },
  // emits: ['update-option-toggle'],
  watch: {
    // option(toggled) {
    //     this.toggled = toggled;
    // },
    // toggled(toggled) {
    //     this.$emit('update-option-toggle', toggled);
    // }
  },
});
</script>

<template>
  <div class="btn-group" role="group" aria-label="Checkbox button filter options">

    <toggle-item v-for="(option, i) in options" :key="i"
                 :label="option.label"
                 :option="option.state"
                 @update-option-toggle="option.state = $event"
                 :left-separation-border-class="i===0? '':'leftSeparationBorder'"
    >
      <toggle-item label="Include Categories" :option="filterSettings.toggles[0].state" @update-option-toggle="filterSettings.toggles[0].state = $event"></toggle-item>

    </toggle-item>
  </div>
</template>
