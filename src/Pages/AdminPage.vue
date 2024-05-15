<!-- Firebase -->
<!-- Vue Application -->
<script>
import {defineComponent, ref} from "vue";
import { collection, query, where } from "firebase/firestore";
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js"

import Account from 'src/models/Account.js'
import 'src/models/Firebase.js'
import { db, auth, storage, accounts } from 'src/models/Firebase.js'
import {Record, RECORD_TYPES, RECORD_ONS} from "src/models/Record";
// import {useQuasar} from "quasar";

const SubmitButtonStatus = { ALLOWED: 'primary', MISSING_DATA: 'warning', INVALID_DATA: 'danger'};

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
          // label: Account.AccountTypes.ADMIN,
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
    inventoryExplorer: {
      type: Object,
      required: true,
    },
  },
  methods: {
    loadAccounts(){
      accounts.get()
        .catch(error => {
          console.log("ERROR1");
          this.$q.notify(`Warning, unable to retrieve data. ${error.id}: "${error.message}" `)
          reject(error);
        })
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
          this.rows = [];
          data.forEach((account, i) => {
            this.rows = this.rows.concat(
              {
                index: i,
                accountEmail: account.email,
                id: account.docId,
                uid: account.docId,
                createdOn: new Date(account.createdOn).toLocaleDateString(),
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
          console.log("ERROR2");
          this.$q.notify(`Error. ${error.id}: "${error.message}" `)
          reject(error);
        });
    },


    createNewAccount(e){
      auth
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

          newAccount.email = createdAuthAccount.user.email;
          newAccount.image = "https://picsum.photos/200";
          newAccount.role = supplementalCreateWithStorage.type;
          newAccount.createdOn = Date.now();
          // newAccount.createdBy =

          accounts
            .doc(createdAuthAccount.user.uid).set(newAccount)
            .catch(error => {
              console.error('Error adding document', error);
              alert('Error!');
            })
            .then(docRef => {
              this.inventoryExplorer.logRecord(RECORD_TYPES.NEW, RECORD_ONS.PROFILE, createdAuthAccount.user.uid, newAccount.email, {setRole: newAccount.role});
            });

        }).then(() => {
          this.loadAccounts();
        });
    },

    removeAccount(uid){
      console.log("Removing account", uid);
      accounts.doc(uid)
        .update({role: "DISABLED"})
        .then(docRef => {
          console.log("docRef", docRef);
          this.$q.notify(`Account "${docRef}" disabled successfully`)
        })
        .catch(error => {
          // TODO: Let the user know
        }).then(() => {
          this.loadAccounts();
        });
    },

    updateRole(uid, newRole){
      console.log("updateRole(docID, newRole)", uid, newRole);
      accounts.doc(uid)
        .update({role: newRole})
        .then(docRef => {
          if(docRef){
            this.$q.notify(`Updated account "${docRef.email}" to role "${docRef.role}" `)
          }else{
            this.$q.notify(`Updated account role`)
          }
        })
        .catch(error => {
          this.$q.notify(`Warning, unable to update role. ${error.id}: "${error.message}" `)
        });

    }
  },
  created: function () {
    this.loadAccounts();
  },
  computed: {
    submitButtonStatus() {
      if(this.noSuffixEmail === null || this.newIdentity.password === null){
        return SubmitButtonStatus.MISSING_DATA
      }
      if(this.noSuffixEmail.length === 0 || this.newIdentity.password.length === 0){
        return SubmitButtonStatus.MISSING_DATA
      }
      if(this.newIdentity.password.length < 10){
        return SubmitButtonStatus.INVALID_DATA
      }
      return SubmitButtonStatus.ALLOWED;
    }
  },
  watch: {
    noSuffixEmail: {
      handler() {
        this.newIdentity.email = this.noSuffixEmail + this.accountCreationStandards.accountEmailSuffix;
      },
    },
  },

});
</script>

<template>
  <div class="q-pa-md">

    <div class="q-pa-lg bg-secondary rounded-top">
      <q-form
        @submit.prevent="createNewAccount"
        class="q-gutter-md"
      >
        <h3 class="full-width mb-3">Account Creator</h3>
        <div class="row q-gutter-md items-start">
          <div class="col-auto">
            <!--            type="email" removed as suffix-->
            <q-input filled v-model="this.noSuffixEmail" :suffix="this.accountCreationStandards.accountEmailSuffix" input-class="text-right" hint="Email" autocomplete="off"
                     :rules="[val => !!val || '* Required']"
                     no-error-icon>
              <template v-slot:before>
                <q-icon name="mail" />
              </template>
            </q-input>
          </div>

          <div class="col-auto">
            <q-input v-model="this.newIdentity.password" filled :type="tempWorkingData.isPwd ? 'password' : 'text'" hint="Password"
                     :rules="[val => !!val && val.length >= 10 || '* Password must be at least 10 characters long ('+val.length+'/10)']"
                     no-error-icon
                     bottom-slots
            >
<!--              <template v-slot:counter>-->
<!--                ({{this.newIdentity.password.length}}/10)-->
<!--              </template>-->

              <template v-slot:append>
                <q-icon
                  :name="tempWorkingData.isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="tempWorkingData.isPwd = !tempWorkingData.isPwd"
                />
              </template>
            </q-input>
          </div>

          <div class="col-auto center-options">
            <q-option-group
              v-model="this.group"
              :options="this.options"
              color="primary"
              inline
            />
          </div>

          <div class="col-auto">
            <q-btn type="submit" icon="bi-plus"
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
          { name: 'created', label: 'Created', field: 'createdOn', align: 'left' },
          { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
          { name: 'avatar', label: 'Avatar', field: 'avatar', align: 'left' },
          { name: 'remove', label: 'Remove', field: 'remove', align: 'center' },
          // { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
          // { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
        ]">
      <template v-slot:body-cell-remove="props">
        <q-btn
          v-if="props.row.role !== 'DISABLED'"
          @click="removeAccount(props.row.id)"
          title="Delete Account"
          icon="bi-trash-fill"
          color="danger"
        />
      </template>
      <template v-slot:body-cell-role="props">
        <q-td key="role" :props="props">
          <div class="row justify-between">
            <div class="col-auto">
              <div :class="props.row.role === 'DISABLED'? 'text-warning': '' ">
                <span v-if="props.row.role.value">
                  {{ props.row.role.value }}
                </span>
                <span v-else>
                  {{ props.row.role }}
                </span>
              </div>
              <q-popup-edit v-model="props.row.role" title="Update Role" v-slot="scope"><!--color="teal"-->
                <q-select
                  @popup-hide="updateRole(props.row.uid, props.row.role.value)"
                  label="New Role"
                  transition-show="scale"
                  transition-hide="scale"
                  filled
                  v-model="props.row.role"
                  :options="options"
                  style="width: 250px"
                />
                <q-icon name="bi-pencil-square" size="1.5em" />
              </q-popup-edit>
            </div>
<!--            <div class="col-auto">-->
<!--              <q-icon name="bi-pencil-square" size="1.5em" />-->
<!--            </div>-->
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-avatar="props">
        <q-td key="avatar" :props="props">
          <img :src="props.row.avatar" class="admin-rows-avatar-image" alt="Profile Avatar">
        </q-td>
      </template>
    </q-table>
  </div>
  <div id="message"></div>
</template>

<style>/*scoped DOES NOT WORK WITH SCOPED*/
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

  .admin-rows-avatar-image{
    width: 4em;
  }

  .center-options .q-radio__label.q-anchor--skip{
    text-align: center;
  }
</style>

<style scoped>
  h3{
    text-align: center;
  }
</style>
