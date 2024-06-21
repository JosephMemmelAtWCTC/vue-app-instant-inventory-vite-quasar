<script>
  import {defineComponent} from "vue";
  import ImageCard from "components/cards/ImageCard.vue";
  import {INVENTORY_DOC_KEY} from "src/models/Firebase";

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
    emits: ['card-clicked', 'card-navigate'],
    methods: {
      sendUpdateCardClicked() {
        if(this.item){
          this.$emit('card-clicked', this.item);
        }else{
          this.$emit('card-clicked');
        }
      },
      sendUpdateCardOpenCategory(docId){
        console.log("sendUpdateCardOpenCategory", docId);
        this.$emit('card-navigate',
          {
            navType: "relative",
            docId: docId
          }
        );
      }
    },
    computed:{
      createdOnDate(){
        const createdOn = new Date(this.item.createdOn);

        // Formatting idea by https://stackoverflow.com/a/29323931
        return 'm-d-Y'
          .replace('Y', createdOn.getFullYear())
          .replace('m', createdOn.getMonth()+1)
          .replace('d', createdOn.getDate());
      }
    }
  });
</script>

<template>
  <image-card
    @click="this.sendUpdateCardOpenCategory(item.docId)"
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
    <slot :item="slotProps.item" class="text-body-secondary">
<!--      {{ slotProps.item.items.length }} unique item{{ slotProps.item.items.length === 1? "":"s" }}-->
      Created {{ createdOnDate }}
    </slot>
    <slot name="extra" :item="slotProps.item">

    </slot>
  </image-card>

</template>
