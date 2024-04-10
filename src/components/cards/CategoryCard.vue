<script>
  import {defineComponent} from "vue";
  import ImageCard from "components/cards/ImageCard.vue";

  export default defineComponent({
    name: "CategoryCard",
    components: {ImageCard},
    props: {
      headerText: {
        type: String,
        required: false,
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
    @card-clicked="passCardWasClickedUp"
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
      {{ slotProps.item.items.length }} unique item{{ slotProps.item.items.length === 1? "":"s" }}
    </slot>
    <slot name="extra" :item="slotProps.item">

    </slot>
  </image-card>

</template>
