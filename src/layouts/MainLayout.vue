<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          {{ appNavigation.currentPageLabel }}
          {{ appInfo.appTitle }}
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      width="180"
    >
      <q-list>
<!--        <q-item-label-->
<!--          header-->
<!--        >-->
<!--          Essential Links-->
<!--        </q-item-label>-->

<!--        <EssentialLink-->
<!--          v-for="link in linksList"-->
<!--          :key="link.title"-->
<!--          v-bind="link"-->
<!--        />-->
        <navigate-icon-item tooltip-info="Home" @click="openNavPage('home')" li-extra-classes="p-2 mb-2" icon-class="bi-house">
        </navigate-icon-item>
        <navigate-icon-item router-link-to="inventory" tooltip-info="Inventory" li-extra-classes="p-2 mb-2" icon-class="bi-box-seam"><!--fa-solid fa-boxes-stacked-->
        </navigate-icon-item>
        <navigate-icon-item tooltip-info="Recents" @click="openNavPage('recents')" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="'library.length'">
        </navigate-icon-item>
        <navigate-icon-item tooltip-info="Account" @click="openNavPage('account')" li-extra-classes="p-2 mb-2" icon-class="bi-person">
        </navigate-icon-item>
      </q-list>
        <footer>
          <navigate-icon-item router-link-to="app" iconContent="Experience Our App" li-extra-classes="p-2 mb-2" icon-class="bi-phone">
          </navigate-icon-item>
        </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {defineComponent} from "vue";
import NavigateIconItem from "components/NavigateIconItem.vue";


defineOptions({
  name: 'MainLayout',
})
defineProps({
  appInfo: {
    type: Object,
    required: true,
  },
  appNavigation: {
    type: Object,
    required: true,
  },
})


// const linksList = [
//   {
//     title: 'Docs',
//     caption: 'quasar.dev',
//     icon: 'school',
//     link: 'https://quasar.dev'
//   },
// ]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<style scoped>
  footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
</style>
