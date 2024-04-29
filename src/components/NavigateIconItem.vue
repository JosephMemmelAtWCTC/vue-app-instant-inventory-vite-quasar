<script>
import {computed, defineComponent} from "vue";
import {useRoute, useRouter} from 'vue-router'

let path = "";

export default defineComponent({
  name: 'NavigateIconItem',

  components: {},
  data() {
    return {
      hover: false,
    }
  },
  props: {
    iconClass: {
      type: String,
    },
    iconContent: {
      type: String,
      required: false,
    },
    badgeText: {
      type: String,
      required: false,
    },
    tooltipInfo: {
      type: String,
      required: false,
    },
    routerLinkTo: {
      type: String,
      required: true,
      default: "/",
    },
    liExtraClasses: {
      type: String,
      required: false,
    },
  },
  // methods: {
  //   Routes() {
  //     return Routes
  //   }
  // },
  computed: {
    isOnCurrentRoute(){
      // console.log("this.path",this.path);
      console.log("this.$route ",this.$route.path );
      // const route=;

      // path = computed(() =>this.$route.path)
      return this.routerLinkTo === this.$route.path;
    }
  },
  // watch: {
  //   route: {
  //     handler() {
  //       // https://stackoverflow.com/a/65989529
  //       const route=useRoute();
  //       path = computed(() =>route.path)
  //     },
  //     deep: true,
  //   },
  // },
  mounted(){
  }
});
</script>

<template>
  <Router-Link :to="routerLinkTo">
<!--https://michaelnthiessen.com/hover-in-vue/ for hover-->
    <div class="nav-item"
         :class="liExtraClasses+(isOnCurrentRoute?' bg-secondary':'')" @mouseover="hover=true" @mouseleave="hover=false">
        <button type="button" class="fw-bold link-secondary primaryNavMovePage position-relative btn btn-primary my-auto h-100 rounded-0 border-start border-end w-100">
            <i class="link-secondary"
                :class="iconClass"
            >
            <span>{{iconContent}}</span>
            </i>
            <Transition name="slide-fade">
                <span v-if="hover || isOnCurrentRoute" class="animationText ms-2">{{tooltipInfo}}</span>
            </Transition>
<!--                <q-tooltip v-if="tooltipInfo" anchor="center right" self="center left" :offset="[10, 10]">-->
<!--                  <strong>{{tooltipInfo}}</strong>-->
<!--&lt;!&ndash;                  (<q-icon name="keyboard_arrow_right"/>)&ndash;&gt;-->
<!--                </q-tooltip>-->
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info text-black">
                {{ badgeText }}
            </span>
        </button>
    </div>
  </Router-Link>
</template>
<style scoped>
  span.badge{
    z-index: 1031;
  }
</style>
