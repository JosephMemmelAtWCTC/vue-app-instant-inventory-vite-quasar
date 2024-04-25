<template>
  <div class="q-pa-md">

    <div class="q-pa-lg bg-amber">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <div class="row q-gutter-md items-start">
          <div class="col-auto">
            <q-input filled v-model="this.newIdentity.email" type="email" suffix="@company.com" input-class="text-right">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>

          <div class="col-auto">
            <q-input v-model="this.newIdentity.password" filled :type="isPwd ? 'password' : 'text'" hint="Password with toggle">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="col-4">
            <q-option-group
              v-model="this.group"
              :options="this.options"
              color="primary"
              inline
              dense
            />
          </div>

          <div class="col-auto">
            <q-btn label="Submit" type="submit" color="primary"/>
<!--            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
          </div>
        </div>
      </q-form>
    </div>
  </div>
<button id="add">Add User</button>
<button id="update">Update Profile</button>
<button id="delete">Delete User</button>
<hr>
<button id="login">Login</button>
<button id="logout">Logout</button>
<hr>
<div id="message"></div>
</template>
<!-- Firebase -->

<!-- Vue Application -->
<script>
//TODO: Ask why it's not working globally
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"
import '/src/firebase.js'
import {defineComponent, ref} from "vue";

export default defineComponent({
  data(){
    return {
      isPwd: false,
      newIdentity: {
        email: null,
        password: null,
        role: null,
      },
      group: ref('UPDATER'),
      options: [
        {
          label: "Admin",
          value: "ADMIN",
        },
        {
          label: "Editor",
          value: "EDITOR",
        },
        {
          label: "Updater",
          value: "UPDATER",
        },
      ]
    };
  },
  methods: {

  },
  // created: function () {
  mounted: function () {
    // obviously, this would come from some form or whatever

    // create user
    document.getElementById('add').onclick = function(e){
      firebase.auth()
        .createUserWithEmailAndPassword(this.newIdentity.email, this.newIdentity.password)
        .catch(function(error) {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;

          document.getElementById('message').innerHTML =  'Error: ' + errorMessage;
        });
    };

    // display logged in/out messages
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        let displayName = user.displayName;
        let email = user.email;
        let emailVerified = user.emailVerified;
        let photoURL = user.photoURL;
        let isAnonymous = user.isAnonymous;
        let uid = user.uid;
        let providerData = user.providerData;

        console.log('Signed in as: ', user);

        // document.getElementById('message').innerHTML = 'Signed in as: ' + displayName + ' (' + email + ')';

      } else {
        this.authUser = null;
        // User is signed out.
        console.log('Not signed in.');

        // document.getElementById('message').innerHTML = 'Signed out.';
      }
    });
  }


  //
  // // login
  // document.getElementById('login').onclick = function(e){
  //   firebase.auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       //     Nickname, photourl
  //     })
  //     .catch(function(error) {
  //       // Handle Errors here.
  //       let errorCode = error.code;
  //       let errorMessage = error.message;
  //
  //       document.getElementById('message').innerHTML =  'Error: ' + errorMessage;
  //     });
  //   //     YOU CAN INCLUDE A .then!
  // };
  //
  // // update profile
  // document.getElementById('update').onclick = function(e){
  //   firebase.auth()
  //     .currentUser
  //     .updateProfile({
  //       displayName: "Joe Schmo",
  //       photoURL: '',
  //       // isVerified
  //       // ...
  //     }).then(function() {
  //     // Update successful.
  //
  //     document.getElementById('message').innerHTML =  'Account updated!';
  //   }).catch(function(error) {
  //     // An error happened.
  //
  //     document.getElementById('message').innerHTML =  'Error: ' + error.message;
  //   });
  // };
  //
  // // delete user
  // document.getElementById('delete').onclick = function(e){
  //   firebase.auth()
  //     .currentUser
  //     .delete()
  //     .then(function() {
  //       // User deleted.
  //     }).catch(function(error) {
  //     // An error happened.
  //   });
  // };
  //
  // // logout
  // document.getElementById('logout').onclick = function(e){
  //   firebase.auth().signOut();
  // };

});


</script>

<style>/*scoped TODO: ASK WHY IT DOES NOT WORK WITH SCOPED*/
  .q-field__before.q-field__marginal.row.no-wrap.items-center{
    width: 20px;
  }
  .q-field__control-container.col.relative-position.row.no-wrap.q-anchor--skip>.q-field__native.q-placeholder{
    width: calc( 100% - 5.5em );
  }
  .q-field__suffix.no-pointer-events.row.items-center{
    width: 5.5em;
  }
  .q-field__native.q-placeholder.text-right{
    padding: 0.2em;
  }
</style>
