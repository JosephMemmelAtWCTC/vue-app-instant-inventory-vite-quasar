<script>
import {defineComponent} from "vue";
import MainContentPage from "components/pages/MainContentPage.vue";
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";
import {accounts, auth, storage} from "src/models/Firebase.js";
import FullUserDetails from "src/models/FullUserDetails";

export const KIOSK_LOCATION_KEY = 'KIOSK_LOCATION_KEY';

export default defineComponent({
  name: "ProfilePage",
  components: {MainContentPage},
  data() {
    return {
      isPwd: true,
      newAuthImage: null,
      locationKioskNameLocal: null,
    };
  },
  props: {
    authUser: {
      // type: Pages,
      type: Object,
      required: true,
      // default: new Pages(),
    },
    locationKioskName: {
      type: String,
      required: true,
    },
  },
  emits: ["update-kiosk-name"],
  methods: {
    signOut(){
      auth.signOut()
        .then(() => {
            this.$router.push({ path: '/login' });
        });
    },
    addImage(docId) {
      // docId and image file are required
      if (!docId || !this.newAuthImage) {
        return false;
      }

      // create a filename we know will be unique
      // the other option would be to create a folder for each recipe
      let allowedTypes = ['jpg', 'png', 'gif', 'webp'];
      let extension = this.newAuthImage.name.toLowerCase().split('.').pop()

      // validate extension
      if (allowedTypes.indexOf(extension) < 0) {
        // invalid extension

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('Invalid file type.');

        return false;
      }

      // validate size (less than 200KB
      // if (this.newAuthImage.size > (200 * 1024)) {
      if (false) {
        // file too large

        // let the user know...
        // TODO: let the user know WITHOUT alerts
        alert('File too large. 200KB max');

        return false;
      }

      // TODO: add image to firebase
      storage.child('accountImages').child(docId)
        .put(this.newAuthImage)
        .then(snapshot => {
          // Clear the form
          this.newAuthImage = null;

          // Get the image URL
          return snapshot.ref.getDownloadURL(); //Returns a promise
        })
        .then(url => {
          this.authUser.image = url;
          return accounts.doc(docId).update({image: url});
        })
        .then(() => {
          console.log('Account updated');
        })
        .catch(error => {
          console.error('Error adding image: ', error);
        });
    }
  },
  computed: {
    profileAvatarSrc(){
      if(this.authUser && this.authUser.image){
        // if(this.newAuthImage == null){
        //   this.newAuthImage = this.authUser.image;
        // }
        return this.authUser.image;
      }else{
        return "./assets/icons/person-circle.svg"
      }
    },
  },
  mounted: function(){

  }
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
                :src="profileAvatarSrc"
                spinner-size="64px"
                spinner-color="secondary"
                class="profile-avatar bg-secondary-subtle"
              />
              <!--      <template v-slot:error>-->
              <!--        <div class="absolute-full flex flex-center bg-negative text-white">-->
              <!--          Cannot load image-->
              <!--        </div>-->
              <!--      </template>-->
            </q-avatar>
          </div>
        </div>
      </div>
      <div class="col-12 w-100">
        <div class="row row-cols-2">
          <div class="col-6 bg-primary q-pa-md fields">
            <q-input filled v-model="this.authUser.email"
                     label="Account Name"
                     class="full-width"
                     readonly="readonly"
            ></q-input>
            <q-input filled v-model="this.locationKioskNameLocal"
                     label="New Kiosk Name"
                     class="full-width"
                     @change="this.$emit('update-kiosk-name', this.locationKioskNameLocal)"
            ></q-input>
<!--            https://fir-demo-621bc.web.app-->


            <q-file filled v-model="newAuthImage" label="New Account Avatar" class="full-width file-input">
    <!--          <template v-slot:prepend>-->
    <!--            <q-icon name="attach_file" style="width:20px !important;"/>-->
    <!--          </template>-->
              <template v-slot:before>
                <q-icon name="attachment" />
              </template>
            </q-file>

            <q-btn @click="addImage(this.authUser.uid)" class="full-width">
              Upload Image
            </q-btn>
          </div>

          <div class="col-6 bg-primary border-5 border-primary-subtle border-start position-relative">
            <q-btn @click="this.signOut" class="absolute-center p-3 p-x-5" color="danger">Sign Out</q-btn>
          </div>
        </div>
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
    padding-top: 10px;
  }
</style>
<style>
.col-12 .col-6:nth-child(1){
  border-radius: 0 0 0 15px;
}
.col-12 .col-6:nth-child(2){
  border-radius: 0 0 15px 0;
}
.file-input .q-field__before.q-field__marginal.row.no-wrap.items-center{
    width: 65px;
  }
  .file-input.q-field__inner.relative-position.col.self-stretch{
    margin-left: 40px;
  }
</style>
