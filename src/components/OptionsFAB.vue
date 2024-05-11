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
    },
    fabButtonSize: {
      type: Number,
      required: false,
      default: 84,
    },
    fabPositioningMarginRight: {
      type: String,
      required: false,
    },
    fabPositioningMarginBottom: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>

<template>
<!--    <div class="dropup-center dropup rounded-circle fab" :style="'z-index='+zIndex">-->
    <div class="dropup-center dropup fab" :style="'z-index='+zIndex">
        <button class="btn btn-primary end-0 m-4 p-4" data-bs-toggle="dropdown" aria-expanded="false" type="button"
                :class="rounded?'rounded-circle':'rounded-borders'"
                :style="
                  'width:'+fabButtonSize+'px;'+
                  'height:'+fabButtonSize+'px;'+
                  'margin-right:'+fabPositioningMarginRight+';'+
                  'margin-bottom:'+fabPositioningMarginBottom+';'
                ">
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
    height: auto;
  }
</style>
