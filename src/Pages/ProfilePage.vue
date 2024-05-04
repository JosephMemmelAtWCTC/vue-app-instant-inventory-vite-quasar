<script>
import {defineComponent} from "vue";
import MainContentPage from "components/pages/MainContentPage.vue";
import "https://www.gstatic.com/firebasejs/8.10.1/firebase.js";
import {accounts, auth, storage} from "src/models/Firebase.js";
import FullUserDetails from "src/models/FullUserDetails";

export default defineComponent({
  name: "ProfilePage",
  components: {MainContentPage},
  data() {
    return {
      isPwd: true,
      locationKioskName: "Changed, TODO",
      newAuthImage: null,
    };
  },
  props: {
    authUser: {
      // type: Pages,
      type: Object,
      required: true,
      // default: new Pages(),
    },
  },
  methods: {
    signOut(){
      auth.signOut()
        .then(() => {
            this.$router.push({ path: '/login' });
        });
    },
    // uploadImage(files){
    //   console.log("this.files[0] = ",files[0]);
    // },
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
      if (this.newAuthImage.size > (200 * 1024)) {
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
      if(!this.authUser && this.authUser.image){
        return this.authUser.image;
      }else{
        return "/src/assets/icons/person-circle.svg"
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
      <div class="col-12 justify-center items-center bg-amber">
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
      </div>
      <div class="col-6 bg-primary q-pa-md fields">
        <q-input filled v-model="this.authUser.email"
                 label="Account Name"
                 class="full-width"
                 lazy-rules
        ></q-input>
        <q-input filled v-model="this.locationKioskName"
                 label="Kiosk Name"
                 class="full-width"
                 lazy-rules
        ></q-input>

<!--        <q-uploader-->
<!--          style="max-width: 300px"-->
<!--          label="Restricted to images"-->
<!--          accept=".jpg, image/*"-->
<!--          @uploaded="console.log('uploadingstart')"-->
<!--          url="./#"-->
<!--          @added="uploadImage()"-->
<!--        />-->
        <q-file filled v-model="newAuthImage" label="Filled" />
          <!--          @failed="uploadImage()"-->

          <!--          <template v-slot:prepend>-->
<!--            <q-icon name="attach_file" />-->
<!--          </template>-->

        <q-input filled
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

        <button @click="addImage(this.authUser.uid)">
          Upload Image
        </button>
    </div>


    <!--        :rules="[val => !!val || '* Required']"-->

        <!--        <div class="m-0 h-100 position-relative">-->

<!--          <div class="p-md-4 p-md-0 rounded-0 row h-auto d-flex align-items-start">-->
<!--  &lt;!&ndash;          <div class="col-12 h-auto">&ndash;&gt;-->
<!--  &lt;!&ndash;            <img width="15%" src="." class="border-secondary p-2 border-2 mx-auto d-block" alt="Profile Picture">&ndash;&gt;-->
<!--  &lt;!&ndash;          </div>&ndash;&gt;-->
<!--            <div class="col-12 col-md-12 h-auto">-->
<!--              <label for="profile-name" class="col-12 col-form-label">Name:</label>-->
<!--              <input type="text" class="form-control focus-ring-primary" id="profile-name" v-model="userInfo.profileName">-->
<!--            </div>-->
<!--            <div id="permissionsChips" class="col-12 h-auto mt-2">-->
<!--              <p>Permissions</p>-->
<!--              &lt;!&ndash;                                TODO: Make settable via table&ndash;&gt;-->
<!--              <p>-->
<!--                <span class="badge text-bg-primary me-1">Admin</span>-->
<!--                <span class="badge text-bg-primary">Add Items</span>-->
<!--              </p>-->
<!--            </div>-->
<!--          </div>-->
<!--          <div class="position-absolute bottom-0 start-50 translate-middle-x mb-4">-->
<!--            &lt;!&ndash;                    <div class="col-auto pt-4 mx-auto h-auto position-absolute bottom-0 start-100 mb-5 translate-middle-x">&ndash;&gt;-->
<!--            <button type="button" class="btn btn-danger">Sign Out</button>-->
<!--          </div>-->
<!--        </div>-->
      <div class="col-6">
        <button @click="this.signOut">Sign Out</button>
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
