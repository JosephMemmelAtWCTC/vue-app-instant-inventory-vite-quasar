<script>
import {defineComponent, ref} from "vue";
import MainContentPage from "components/pages/MainContentPage.vue";
import { db, auth, storage } from 'src/models/Firebase.js'

export default defineComponent({
  name: "LoginPage",
  components: {MainContentPage},
  data() {
    return {
      isPwd: true,
      loginAccount: {
        username: "",
        password: "",
      }
    };
  },
  props: {
  },
  methods: {
    attemptLoginAccount(){
      console.log(">>>>",this.loginAccount.username, this.loginAccount.password);
      auth
        .signInWithEmailAndPassword(this.loginAccount.username, this.loginAccount.password)
        .catch((error) => {
          // "{"error":{"code":400,"message":"INVALID_LOGIN_CREDENTIALS","errors":[{"message":"INVALID_LOGIN_CREDENTIALS","domain":"global","reason":"invalid"}]}}
          try{
            const warningJson = JSON.parse(error.message);

            if(warningJson.error.message==="INVALID_LOGIN_CREDENTIALS"){
              this.$q.notify(`Invalid Login Credentials. TODO: Make shake`)
            }else{
              this.$q.notify(`Error signing in "${error.message}".`)
            }
          }catch(catchError){
            this.$q.notify(`Error signing in "${error.message}".`)
          }
        });
    },
  },
  computed: {
  },
  mounted: function(){
    auth.onAuthStateChanged(user => {
      console.log("Pathing");
      if (user) {
        this.$router.push({ path: '/' });
      }
    });
  },
});
</script>

<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-12 bg-secondary rounded-top-4"><!--justify-center items-center -->
        <div class="row my-3">
          <div class="col-auto mx-auto">
            <q-avatar size="140px">
              <q-img
                src="icons/person-circle.svg"
                spinner-size="64px"
                spinner-color="secondary"
                class="profile-avatar bg-secondary-subtle"
              />
            </q-avatar>
          </div>
        </div>
      </div>
      <div class="col-12 bg-primary q-pa-md fields">
        <q-form
          @submit.prevent="attemptLoginAccount"
          class="q-gutter-md ms-3 mt-2"
        >
          <q-input filled v-model="this.loginAccount.username"
                   label="Username"
                   class="full-width"
                   lazy-rules
          ></q-input>
          <q-input filled v-model="this.loginAccount.password"
                   label="Password"
                   :type="this.isPwd ? 'password' : 'text'"
                   class="full-width mt-2"
                   >
          </q-input>

          <q-btn type="submit" icon="bi-door-open-fill" class="full-width consistent-full-width"
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
  .profile-avatar{
    //height: 140px;
    //width: 140px;
    height: 100%;
  }
  .consistent-full-width{
    width: 95% !important;
  }
</style>
