<script>
import {defineComponent} from "vue";

export default defineComponent({
  data(){
    return {
      downloadUrls: {

      },
    };
  },
  computed: {
  },
  components: {},
  props: {
  },
  mounted() {
  }
});
</script>


<template>
  <q-page class="flex flex-center">
    <div class="row">
      <div class="col-auto q-pl-lg">
        <div class="column">
          <div class="q-pa-lg q-pt-lg">
            <h1>
              Get The App
            </h1>
            <br>
            <p class="content">
              Getting this app lets you see this placeholder text that I can't come up with content for yet!
            </p>
          </div>
        </div>
        <div class="column">
          <ul class="text-center">
            <li>Get updates on the go</li>
            <li>Available for tablets</li>
            <li>Scan Barcodes Directly Into the System</li>
          </ul>
        </div>
        <div class="q-mt-lg position-relative">
          <q-btn color="primary py-3 px-4 absolute-center mt-5" rounded @click="this.$q.notify('APK is not avaiable') ">
            <a href="" download class="text-secondary">
                <q-icon name="bi-download" /> <span class="mx-3">Download APK</span> <q-icon name="bi-android2" />
            </a>
          </q-btn>

        </div>
      </div>
      <div class="col-auto">
<!--        <transition transition-show="jump-down">-->

<!--          <img src="images/clearPlaceholderPhoneImage.png" alt="Placeholder phone image"/>-->
          <img src="images/signal-2024-05-15-031201-portrait.png" alt="App demo login screenshot"/>
      </div>

      <!--        </transition>-->
<!--        transition-show="fade"-->
<!--        transition-duration="300"-->
    </div>
  </q-page>
</template>

<style scoped>
  img{
    transform: rotate(10deg);
    height: 75vh;
    width: auto;
  }
  p.content{
    width: 40vw;
  }

  /*q-btn >*/
  a {
    text-decoration: none;
  }
  a > span {
    font-size: 1.5em;
  }


  /*https://stackoverflow.com/a/46803014 for bullet formatting base*/
  ul {
    list-style-type: none;
  }
  li {
    display: grid;
    grid-template-columns: 20px auto;
    justify-content: start;
    align-items: center;
  }
  li::before {
    content: ">";
    font-size: 1em;
    //color: #999;
  }
</style>
