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
            <li>Get updates on the go.</li>
            <li>Scan Barcodes Directly Into the System</li>
          </ul>
        </div>
        <div class="q-mt-lg">
          <a href="src/assets/images/clearPlaceholderPhoneImage.png" download>
            APK
          </a>
        </div>
      </div>
      <div class="col-auto">
        <img src="src/assets/images/clearPlaceholderPhoneImage.png" alt="Placeholder phone image"/>
      </div>
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
