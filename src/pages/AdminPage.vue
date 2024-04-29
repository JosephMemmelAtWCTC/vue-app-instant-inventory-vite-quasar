<!-- Firebase -->
<!-- Vue Application -->
<script>
import {defineComponent, ref} from "vue";
import { collection, query, where } from "firebase/firestore";
//TODO: Ask why it's not working globally
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"

import Account from 'src/models/Account.js'
import 'src/models/Firebase.js'
import { db } from 'src/models/Firebase.js'
// import {useQuasar} from "quasar";

const SubmitButtonStatus = { ALLOWED: 'primary', MISSING_DATA: 'warning', INVALID_DATA: 'error'};

let accounts = firebase.firestore().collection('accounts');

export default defineComponent({
  data(){
    return {
      tempWorkingData: {
        isPwd: ref(true),
      },
      noSuffixEmail: null,
      rows: [],

      newIdentity: {
        email: ref(''),
        password: ref(''),
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
  props: {
    accountCreationStandards:{
      type: Object,
      default: {
        accountEmailSuffix: "@company.com",
      }
    },
  },
  methods: {
    testLoading(){
      firebase.firestore().collection('accounts').get()
        .then(querySnapshot => {
          console.log("!!!!", querySnapshot);
          const data = [];
          querySnapshot.forEach(doc => {
            const dataPush = doc.data();
            dataPush.docId = doc.id;
            data.push(dataPush);
          });
          // resolve(data);
          console.log("!!!!2", data);
          data.forEach((account, i) => {
            this.rows = this.rows.concat(
              {
                index: i,
                accountEmail: account.email,
                id: account.docId,
                uid: account.authenticationUID,
                lastLogin: "###",
                role: account.role,
                avatar: account.image,
                remove: {
                  icon: "delete",
                  label: "Remove",
                }
              }
            );
          });
          // this.rows.forEach((row, index) => {
          //   row.remove = "";
          // })
        })
        .catch(error => {
          reject(error);
        });
    },


    createNewAccount(e){
      console.log("createNewAccount", this.newIdentity.email, this.newIdentity.password);

      firebase.auth()
        .createUserWithEmailAndPassword(this.newIdentity.email, this.newIdentity.password)
        .then((createdAccount) => {
          console.log("createdAccount", createdAccount);
          this.$q.notify(`Account "${this.newIdentity.email}" created successfully`)
          this.noSuffixEmail = ref('');
          this.newIdentity.password = ref('');
          console.log("this.group", this.group);
          return {createdAccount: createdAccount, createWithStored: {
              type: this.group,
            }};
        })
        .catch((error) => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;

          // document.getElementById('message').innerHTML =  'Error: ' + errorMessage;
          console.error(errorMessage);
          this.$q.notify({
            message: `${errorMessage}`,
            color: 'warning',
            progress: true,
            actions: [
              {
                icon: 'bi-x-lg',
                color: 'primary',
                round: true,
                handler: () => {
                }
              }
            ]
          });
          return Promise.reject(errorMessage);
        })
        .then((newAccountCreationStorage) => {
          const createdAuthAccount = newAccountCreationStorage.createdAccount;
          const supplementalCreateWithStorage = newAccountCreationStorage.createWithStored;
          let newAccount = new Account();

          newAccount.authenticationUID = createdAuthAccount.user.uid;
          newAccount.email = createdAuthAccount.user.email;
          newAccount.image = "https://picsum.photos/200";
          newAccount.role = supplementalCreateWithStorage.type;

          accounts
            .add(newAccount)
            .then(docRef => {
              console.log('Document Written', docRef);
              // alert('Added!');
            })
            .catch(error => {
              console.error('Error adding document', error);
              alert('Error!');
            });

          // .child(docId)
          //   .put(theRecipe.image)
          //   .then(snapshot => {
          //     // Clear the form
          //     this.newRecipe.image = null;
          //
          //     // Get the image URL
          //     return snapshot.ref.getDownloadURL(); //Returns a promise
          //   })
          //   .then(url => {
          //     return db.collection('recipes').doc(docId).update({image: url});
          //   })
          //   .then(docRef => {
          //     console.log('Recipe updated');
          //   })
          //   .catch(error => {
          //     console.error('Error adding image: ', error);
          //   });
        });
    },

    removeAccount(uid){
      // firebase.auth().getUser(uid)//TODO: Ask
      // firebase.auth().getUserByEmail(uid)
      //   .then((userRecord) => {
      //     return firebase.auth().deleteUser(userRecord.uid);
      //   })
      //   .delete()
      //   .then(function() {
      //     this.$q.notify(`Account "${""}" removed successfully`)
      //   }).catch(function(error) {
      //     alert(error);
      // });
    }
  },
  mounted: function () {
    // accounts = storage.child('accounts');

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

        // TODO: Ask how to query
        // firebase.firestore().collection('accounts').ref()
        // const db = firebase.firestore();
        // const accountsRef = collection(db, "accounts");
        // console.log("db", db);
        // const accountsCollection = collection(db, "accounts");
        // const q = query(accountsCollection, where("authenticationUID", "==", user.uid))
        // firebase.firestore().collection('accounts').get()

        // const q = query(
        //   firebase.firestore().collection('accounts'),
        //   where("authenticationUID", "==", user.uid)
        // );

        // const q = query(firebase.firestore().collection('accounts'), where("authenticationUID", "==", user.uid))
          // .get()
          // .then(querySnapshot => {
          //   console.log("query", querySnapshot);
          // });

        // if(){
        //   testLoading();
        // }

        // document.getElementById('message').innerHTML = 'Signed in as: ' + displayName + ' (' + email + ')';

      } else {
        this.authUser = null;
        // User is signed out.
        console.log('Not signed in.');

        // document.getElementById('message').innerHTML = 'Signed out.';
      }
    });

  },
  created: function () {
    // accounts = storage.child('accounts');
    // const storage2 = firebase.storage().ref();

    // const storage = firebase.storage().ref();

// or with a config object:
    // firebase.auth()
    //   .listUsers(100)
    //   .then((listUsersResult) => {
    //     listUsersResult.users.forEach((userRecord) => {
    //       console.log('user', userRecord.toJSON());
    //     });
    //     if (listUsersResult.pageToken) {
    //       // List next batch of users.
    //       listAllUsers(listUsersResult.pageToken);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error listing users:', error);
    //   });

    // for (let i = 0; i < 5; i++) {
    //   this.rows = this.rows.concat(
    //     {
    //       name: 'Frozen Yogurt',
    //       calories: 159,
    //       fat: 6.0,
    //       carbs: 24,
    //       protein: 4.0,
    //       sodium: 87,
    //       calcium: '14%',
    //       iron: '1%'
    //     }
    //   );
    // this.rows.forEach((row, index) => {
    //   row.index = index
    // })
  },
  computed: {
    submitButtonStatus() {
      if(this.noSuffixEmail === null || this.newIdentity.password === null){
        return SubmitButtonStatus.MISSING_DATA
      }
      if(this.noSuffixEmail.length === 0 || this.newIdentity.password.length === 0){
        return SubmitButtonStatus.MISSING_DATA
      }
      if(this.newIdentity.password.length < 6){
        return SubmitButtonStatus.INVALID_DATA
      }
      return SubmitButtonStatus.ALLOWED;
    }
  },
  watch: {//TODO: Ask if should be put in computed?
    noSuffixEmail: {
      handler() {
        this.newIdentity.email = this.noSuffixEmail + this.accountCreationStandards.accountEmailSuffix;
      },
    },
  },


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

<template>
  <div class="q-pa-md">

    <div class="q-pa-lg bg-amber">
      <button @click="testLoading">Load storage</button>
      <q-form
        @submit.prevent="createNewAccount"
        class="q-gutter-md"
      >
        <div class="row q-gutter-md items-start">
          <div class="col-auto">
            <!--            type="email" removed as suffix-->
            <q-input filled v-model="this.noSuffixEmail" :suffix="this.accountCreationStandards.accountEmailSuffix" input-class="text-right" hint="Email" autocomplete="off">
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>

          <div class="col-auto">
            <q-input v-model="this.newIdentity.password" filled :type="tempWorkingData.isPwd ? 'password' : 'text'" hint="Password">
              <template v-slot:append>
                <q-icon
                  :name="tempWorkingData.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="tempWorkingData.isPwd = !tempWorkingData.isPwd"
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
            <!--            TODO: Keep as push?-->
            <q-btn type="submit" push icon="bi-plus"
                   :color="submitButtonStatus"
                   :disable="submitButtonStatus !== 'primary'"
            /><!--label="Create New Profile"-->
            <!--            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />-->
          </div>
        </div>
      </q-form>
    </div>

    <!--    v-model:pagination=""-->

    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
      flat bordered
      :rows-per-page-options="[0]"
      :virtual-scroll-sticky-size-start="48"
      no-data-label="Try clicking load storage"
      no-results-label="The filter didn't uncover any results"
      row-key="index"
      title="Accounts"
      :rows="rows"
      :columns="[
          {
            name: 'index',
            label: '#',
            field: 'index'
          },
          {
            name: 'accountEmail',
            required: true,
            label: 'Account',
            align: 'left',
            field: row => row.accountEmail,
            format: val => `${val}`,
            sortable: true
          },
          { name: 'id', label: 'Firestore ID', field: 'id', align: 'left', sortable: true },
          { name: 'uid', label: 'UID', field: 'uid', align: 'left', sortable: true },
          { name: 'last login', label: 'Last Login', field: 'lastLogin', align: 'left' },
          { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
          { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'left' },
          { name: 'remove', label: 'Remove', field: 'remove', align: 'center' },
          // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
          // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
        ]">
      <template v-slot:body-cell-remove="props">
        <q-btn
          @click="removeAccount(props.row.uid)"
          title="Delete Account"
          icon="bi-trash-fill"
          color="danger"
        />
      </template>
      <template v-slot:body-cell-role="props">
        <q-td key="role" :props="props">
          <span v-if="props.row.role.value">
            {{ props.row.role.value }}
          </span>
          <span v-else>
            {{ props.row.role }}
          </span>
          <q-popup-edit v-model="props.row.role" title="Update Role" v-slot="scope">
            <q-select
              label="New Role"
              transition-show="scale"
              transition-hide="scale"
              filled
              v-model="props.row.role"
              :options="options"
              style="width: 250px"
            />
          </q-popup-edit>
        </q-td>
      </template>
    </q-table>

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
  .q-field__append.q-field__marginal.row.no-wrap.items-center{
    width: 20px;
  }
</style>
