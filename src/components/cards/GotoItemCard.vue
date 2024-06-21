<script>
import {defineComponent} from "vue";
import ImageCard from "components/cards/ImageCard.vue";

export default defineComponent({
  name: "GotoItemCard",
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
  emits: ['card-clicked', 'card-navigate'],
  methods: {
    sendUpdateCardOpenCategory(docId){
      console.log("sendUpdateCardOpenCategory~", docId);
      this.$emit('card-navigate', docId);
    }
  },
});
</script>

<template>
<!--  @card-clicked="this.sendUpdateCardClicked"-->
  <image-card
    @click="this.sendUpdateCardOpenCategory({
      navType: 'absolute',
      // parentLocation: item.parentLocation.substring(0, item.parentLocation.length-11), // '/categories'.length
      // docId: item.id,
      docId: '',
      breadcrumbs: item.breadcrumbs,
    });"
    :imageSrc="item.imageURL"
    :item="item"
    :headerText="item.title"
    :descriptionText="item.description"
    class="my-1"
    wrapper-class="animate-pop-in hover-expand"
    card-height="450px"
    v-slot="slotProps"
  >
    <slot :item="slotProps.item" class="text-body-secondary">
      <!--      {{ slotProps.item.items.length }} unique item{{ slotProps.item.items.length === 1? "":"s" }}-->
      Category {{ item.parentCategoryName }}
    </slot>
    <slot name="extra" :item="slotProps.item">
    </slot>
  </image-card>

</template>
