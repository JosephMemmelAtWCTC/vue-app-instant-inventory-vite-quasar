<script>
import {defineComponent, ref} from "vue";
import MainContentPage from "components/pages/MainContentPage.vue";
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import { db, auth, storage } from 'src/models/Firebase.js'
import {isDisabled} from "bootstrap/js/src/util";

export default defineComponent({
  name: "LoginPage",
  components: {MainContentPage},
  data() {
    return {
      isPwd: true,
      loginAccount: {
        // username: null,
        // password: null,
        username: "test@company.com",
        password: "testtest",
      }
    };
  },
  props: {
    appNavigation: {
      type: Object,
      required: false,
    },
  },
  methods: {
    attemptLoginAccount(){
      console.log(">>>>",this.loginAccount.username, this.loginAccount.password);
      auth
        .signInWithEmailAndPassword(this.loginAccount.username, this.loginAccount.password)
        .catch(function(error) {
          this.$q.notify(`Error signing in. ${error.id}: "${error.message}" `)
        });
    },
  },
  computed: {
  },
});
</script>

<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12 justify-center items-center bg-amber">
        <q-avatar size="140px">
          <q-img
            src="/src/assets/icons/person-circle.svg"
            spinner-size="64px"
            spinner-color="secondary"
            class="profile-avatar"
          />
        </q-avatar>
      </div>
      <div class="col-12 bg-primary q-pa-md fields">
        <q-form
          @submit.prevent="attemptLoginAccount"
          class="q-gutter-md"
        >
          <q-input filled v-model="this.loginAccount.username"
                   label="Username"
                   class="full-width"
                   lazy-rules
          ></q-input>
          <q-input filled v-model="this.loginAccount.password"
                   label="Password"
                   :type="this.isPwd ? 'password' : 'text'"
                   hint="Password with toggle">
            <!--          <template v-slot:append>-->
            <!--            <q-icon-->
            <!--              :name="this.isPwd ? 'visibility_off' : 'visibility'"-->
            <!--              class="cursor-pointer"-->
            <!--              @click="this.isPwd = !this.isPwd"-->
            <!--            />-->
            <!--          </template>-->
          </q-input>

          <q-btn type="submit" push icon="bi-door-open-fill"
           color="primary"
           :disable="!this.loginAccount.username || !this.loginAccount.password || this.loginAccount.username.length === 0 || this.loginAccount.password.length === 0">
            Login
          </q-btn>

        </q-form>
      </div>

    </div>
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
  .fields > label:not(:first-child){
    padding-top: 10px; /*TODO: Make use scss variables to q-sm size */
  }
</style>
