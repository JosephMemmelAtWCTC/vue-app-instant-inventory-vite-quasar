<script>
import {defineComponent} from "vue";
import ImageCard from "components/cards/ImageCard.vue";

export default defineComponent({
  name: "ItemCard",
  components: {ImageCard},
  props: {
    headerText: {
      type: String,
      required: false,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    descriptionText: {
      type: String,
      required: false,
    },
    footerText: {
      type: String,
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },
  },
  emits: ['card-clicked'],
  methods: {
    sendUpdateCardClicked() {
      if(this.item){
        this.$emit('card-clicked', this.item);
      }else{
        this.$emit('card-clicked');
      }
    }
  },
});
</script>

<template>
  <image-card
    @card-clicked="this.sendUpdateCardClicked"
    :imageSrc="item.imageSrc"
    :item="item"
    :headerText="item.title"
    :descriptionText="item.description"
    class="my-1"
    wrapper-class="animate-pop-in hover-expand"
    card-height="450px"
    v-slot="slotProps"
  >
    <slot :item="slotProps.item">
      <div :class="{'text-warning-emphasis': slotProps.item.hasLowStock}">
        {{ slotProps.item.numInStock }}{{ slotProps.item.reorderLevel === -1 || slotProps.item.reorderLevel === undefined || slotProps.item.reorderLevel === null ? "" : "/"+slotProps.item.reorderLevel }} item{{ slotProps.item.numInStock == 1 ? "" : "s" }} in stock
        <i v-if="slotProps.item.hasLowStock" class="bi bi-exclamation-diamond-fill"></i>
      </div>
    </slot>
    <slot name="extra" :item="slotProps.item">

    </slot>
  </image-card>
</template>
