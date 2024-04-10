<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "OptionsFAB",
  components: {},
  data() {
    return {
    };
  },
  props: {
    positionClasses: {
      type: String,
      required: false,
      default: "",
      //     TODO: Make easy selection for top/bottom & start/end
    },
    zIndex: {
      type: String, //Number,
      required: false,
      default: 1001,
    },
    symbolClasses: {
      type: String,
      required: true,
    }
  },
  emits: [],
  watch: {
    example: {
      handler() {
        this.$emit('example', '');
      },
    },
  },
});
</script>

<template>
    <div class="dropup-center dropup rounded-circle fab" :style="'z-index='+zIndex">
        <button class="rounded-circle btn btn-primary end-0 m-4 p-4" data-bs-toggle="dropdown" aria-expanded="false" type="button">
            <span class="d-inline-block fs-5 link-secondary">
                <i :class="symbolClasses">
                </i>
            </span>
        </button>
<!--TODO REMOVE ID- used for styling-->
        <ul class="dropdown-menu pe-2"  id="dropupAddHolder">
            <slot name="open">

            </slot>
        </ul>
    </div>
</template>

<style scoped>
  .fab > button {
    width: 84px;
    height: 84px;
  }
</style>
