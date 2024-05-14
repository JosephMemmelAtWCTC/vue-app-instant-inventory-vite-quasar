<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "ImageCard",
  data() {
    return {
      uid: 'sli-' + Math.floor(Math.random() * 10e15),
    }
  },
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
      type: String,  // Change the type to String
      required: false,
    },
    item: {
      type: Object,
      required: false,
    },
    wrapperClass: {
      type: String,
      required: false,
    },
    cardHeight: {
      type: String,
      required: false,
    }
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
  <div :class="wrapperClass">
    <div class="card" :style="'height:'+cardHeight">
      <slot name="header">
        <div class="card-header bg-transparent text-truncate">
          <div class="row">
            <div class="col-10">
              {{ headerText }}
            </div>
            <div class="col-1">
              <q-icon
                name="bi-pencil-square"
                @click.stop="sendUpdateCardClicked"
                class="hover-show-hand"
              >
              </q-icon>
            </div>
          </div>
        </div>
      </slot>
      <img :src="imageSrc" class="displayImage p-0 m-0 rounded-0 border-bottom w-auto" alt="Loading..."><!--TODO:-->
      <div class="card-body overflow-y-scroll">
        <slot name="description">
          <p class="card-text">{{ descriptionText }}</p>
        </slot>
      </div>
      <div class="card-footer bg-transparent">
        <slot :item="item">
          {{ footerText }} <!-- Display the footerText directly -->
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
  img.displayImage {
    height: 190px;
    width: auto;
    object-fit: contain;
  }
</style>
