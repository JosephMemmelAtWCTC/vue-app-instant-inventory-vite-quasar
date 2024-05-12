<script>
import {defineComponent} from "vue";
import {Html5QrcodeScanner} from "html5-qrcode";

export default defineComponent({
  name: "qrcode-scanner",
  data() {
    return {};
  },
  props: {
    qrbox: {
      type: Number,
      default: 250
    },
    fps: {
      type: Number,
      default: 10
    },
  },
  mounted () {
    const config = {
      fps: this.fps,
      qrbox: this.qrbox,
    };
    const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', config);
    html5QrcodeScanner.render(this.onScanSuccess);
  },
  methods: {
    onScanSuccess (decodedText, decodedResult) {
      this.$emit('result', decodedText, decodedResult);
    }
  }
});
</script>

<template>
  <div id="qr-code-full-region"></div>
</template>
