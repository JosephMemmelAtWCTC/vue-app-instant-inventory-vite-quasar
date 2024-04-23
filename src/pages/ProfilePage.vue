<script>
import {defineComponent} from "vue";
import MainContentPage from "components/pages/MainContentPage.vue";


export default defineComponent({
  name: "InventoryPage",
  components: {MainContentPage},
  data() {
    return {
    };
  },
  props: {
    appNavigation: {
      type: Object,
      required: false,
    },
    userInfo: {
      type: Object,
      required: true,
    },
  },
  methods: {
  },
  computed: {
    profileAvatarSrc(){
      if(this.userInfo.profileAvatar){
        return this.userInfo.profileAvatar;
      }else{
        return "src/assets/icons/person-circle.svg"
      }
    },
  },
});
</script>

<template>
  <q-page class="flex flex-center">
    <q-avatar size="140px">
      <q-img
        :src="profileAvatarSrc"
        spinner-size="64px"
        spinner-color="secondary"
        class="profile-avatar"
      />
<!--      TODO: Ask about error slot -->
<!--      <template v-slot:error>-->
<!--        <div class="absolute-full flex flex-center bg-negative text-white">-->
<!--          Cannot load image-->
<!--        </div>-->
<!--      </template>-->
    </q-avatar>
  </q-page>
</template>

<style scoped>
  /*.q-avatar__content{*/
  /*.q-avatar>div{
  //  border: solid 2px red;
  }*/
  /*.q-img{*/
  .profile-avatar{
    //height: 140px;
    //width: 140px;
    height: 100%;
  }
</style>


<!--      <div class="q-pa-md q-gutter-sm">-->
<!--        <q-img-->
<!--          size="196px"-->
<!--          src="src/assets/icons/person-circle.svg"-->
<!--          spinner-color="secondary"-->
<!--          spinner-size="64px"-->
<!--        />-->
<!--      </div>-->

<!--      <q-img-->
<!--        src="https://cdn.quasar.dev/img/avatar.png"-->
<!--        spinner-color="secondary"-->
<!--        spinner-size="64px"-->
<!--      />-->
<!--        <div class="q-pa-md">-->
<!--          <div class="column" style="height: 250px">-->
<!--&lt;!&ndash;              <q-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;                <img src="https://cdn.quasar.dev/img/avatar.png" alt="Profile Avatar">&ndash;&gt;-->
<!--&lt;!&ndash;              </q-avatar>&ndash;&gt;-->
<!--              <div class="q-pa-md q-gutter-sm">-->
<!--              <q-avatar size="100px" font-size="52px" color="teal" text-color="white" icon="directions" />-->
<!--              </div>-->
<!--&lt;!&ndash;            <div class="col-auto">&ndash;&gt;-->
<!--&lt;!&ndash;              .col-auto (Variable height content)&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--&lt;!&ndash;            <div class="col col-md-4">&ndash;&gt;-->
<!--&lt;!&ndash;              .col .col-md-4&ndash;&gt;-->
<!--&lt;!&ndash;            </div>&ndash;&gt;-->
<!--          </div>-->

<!--          <div class="column" style="height: 250px">-->
<!--            <div class="col">-->
<!--              .col-->
<!--            </div>-->
<!--            <div class="col-auto">-->
<!--              .col-auto (Variable height content)-->
<!--            </div>-->
<!--            <div class="col col-md-3">-->
<!--              .col .col-md-3-->
<!--            </div>-->
<!--          </div>-->

<!--        </div>-->

<!--      <div class="m-0 h-100 position-relative">-->

<!--        <div class="p-md-4 p-md-0 rounded-0 row h-auto d-flex align-items-start">-->
<!--&lt;!&ndash;          <div class="col-12 h-auto">&ndash;&gt;-->
<!--&lt;!&ndash;            <img width="15%" src="." class="border-secondary p-2 border-2 mx-auto d-block" alt="Profile Picture">&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--          <div class="col-12 col-md-12 h-auto">-->
<!--            <label for="profile-name" class="col-12 col-form-label">Name:</label>-->
<!--            <input type="text" class="form-control focus-ring-primary" id="profile-name" v-model="userInfo.profileName">-->
<!--          </div>-->
<!--          <div id="permissionsChips" class="col-12 h-auto mt-2">-->
<!--            <p>Permissions</p>-->
<!--            &lt;!&ndash;                                TODO: Make settable via table&ndash;&gt;-->
<!--            <p>-->
<!--              <span class="badge text-bg-primary me-1">Admin</span>-->
<!--              <span class="badge text-bg-primary">Add Items</span>-->
<!--            </p>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4">-->
<!--          &lt;!&ndash;                    <div class="col-auto pt-4 mx-auto h-auto position-absolute bottom-0 start-100 mb-5 translate-middle-x">&ndash;&gt;-->
<!--          <button type="button" class="btn btn-danger">Sign Out</button>-->
<!--        </div>-->
<!--      </div>-->
