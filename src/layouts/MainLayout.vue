<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import NavigateIconItem from "components/NavigateIconItem.vue";
import { db, auth, storage } from 'src/models/Firebase.js'

import FullUserDetails from "src/models/User";

export default defineComponent({
  name: 'MainLayout',
  components: {},
  data(){
    return {
      appNavigation: {
      },
      userInfo: {
      },
      locationKioskName: "locationKioskName",
      leftDrawerOpen: false,
    };
  },
  props: {
    authUser: {//TODO: Fully remove userInfo
      type: FullUserDetails,
      required: true,
    },
    appInfo: {
      type: Object,
      default: {
        appTitle: "Instant Inventory",
        appVersion: "Vue App v4.0 (Demo)",
        sideBarWidth: 180,
      }
    },
  },
  methods: {
    toggleLeftDrawer(){
      this.leftDrawerOpen = !this.leftDrawerOpen;
    }
  }
});
</script>

<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated class="q-ma-none-forced">
      <q-toolbar>
        <div class="row justify-between q-ma-none-forced q-gutter-none">
          <div class="col-auto q-pa-none-forced">
            <div class="bg-accent full-height q-pa-sm position-relative"
              :style="'width:'+appInfo.sideBarWidth+'px'"
            >
              <p class="text-center absolute-center">
                {{ this.locationKioskName }}
              </p>
            </div>
          </div>
          <div class="col-6">
            <q-btn
              flat
              dense
              round
              icon="menu"
              aria-label="Menu"
              @click="toggleLeftDrawer"
            />

            <q-toolbar-title>
<!--              {{ appNavigation.currentPageLabel }}-->
              {{ appInfo.appTitle }}
            </q-toolbar-title>

          </div>
          <div class="col-auto bg-amber">
            <Router-Link to="account">
              <div class="full-height q-py-sm">
                <div class="row">
                  <div class="col-auto">
                    <div class="column full-height justify-center">
                      <div class="col">
                        {{authUser.email}}
                      </div>
                      <div class="col">
<!--                        <q-chip color="primary" text-color="white" icon="event">-->
<!--                          Add-->
<!--                        </q-chip>-->
                        <span>
                        <q-chip color="colorAdmin" text-color="white">
                          <span>
                          <q-icon name="event" class="chip-icon" />
                          {{ authUser.role }}
                          </span>
                        </q-chip>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-auto">
                    <q-avatar size="76px" class="q-ml-md">
                      <q-img
                        :src="authUser.image"
                        spinner-size="64px"
                        spinner-color="secondary"
                        class="profile-avatar"
                      />
                    </q-avatar>
                  </div>
                </div>
              </div>
            </Router-Link>
          </div>
        </div>
      </q-toolbar>
    </q-header>

<!-- Sidebar-->
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="appInfo.sideBarWidth"
    >
<!--      <q-popup-edit v-model="editableKioskNameLocal" auto-save v-slot="scope">-->
<!--        <q-input v-model="scope.value" dense autofocus @keyup.enter="scope.set" autocomplete-->
<!--                 :rules="[val => val.length > 1 || 'Title requires at least 1 character', [val => val.length < 20 || 'Title cannot at least 1 character']]"/>-->
<!--      </q-popup-edit>-->

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
        <navigate-icon-item router-link-to="/" tooltip-info="Home" li-extra-classes="p-2 mb-2" icon-class="bi-house">
        </navigate-icon-item>
        <navigate-icon-item router-link-to="/inventory" tooltip-info="Inventory" li-extra-classes="p-2 mb-2" icon-class="bi-box-seam"><!--fa-solid fa-boxes-stacked-->
        </navigate-icon-item>
        <navigate-icon-item tooltip-info="Recents" li-extra-classes="p-2 mb-2" icon-class="bi-arrow-left-right" :badge-text="'library.length'">
        </navigate-icon-item>
<!--        <navigate-icon-item router-link-to="/account" tooltip-info="Account" li-extra-classes="p-2 mb-2" icon-class="bi-person">-->
<!--        </navigate-icon-item>-->
        <navigate-icon-item router-link-to="/admin" tooltip-info="Admin" li-extra-classes="p-2 mb-2" icon-class="bi-terminal">
        </navigate-icon-item>
      </q-list>
        <footer>
          <navigate-icon-item router-link-to="/app" iconContent="Experience Our App" li-extra-classes="p-2 mb-2" icon-class="bi-phone">
          </navigate-icon-item>
        </footer>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>


<style scoped>
  footer{
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  .profile-avatar{
    height: 100%;
    //width: auto;
  }
  .q-pa-none-forced{
    padding: 0 0 !important;
  }
</style>
