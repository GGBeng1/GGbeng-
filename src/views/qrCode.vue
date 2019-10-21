<template>
  <div>
    <div style="padding: 24px;padding-top: 120px">
      <mu-container>
        <mu-card
          style="width: 100%; max-width: 750px; margin: 0 auto;padding: 20px;"
        >
          <h1>Qr 二维码转换</h1>
          <mu-text-field
            v-model="value"
            multi-line
            :rows="4"
            full-width
            placeholder="请输入需要转换的信息"
          ></mu-text-field>
          <mu-button color="primary" @click="handlerQrcode">转换</mu-button>
          <mu-button @click="handlerClear" style="margin-left:20px"
            >清空</mu-button
          >
          <!-- <div id="qrcode"></div> -->
          <div style="margin-top:20px">
            <vue-qr
              :text="qrcode"
              :margin="0"
              colorDark="#000"
              colorLight="#fff"
            ></vue-qr>
          </div>
        </mu-card>
      </mu-container>
    </div>
  </div>
</template>

<script>
// import QRCode from "qrcodejs2"; // 引入qrcode
import vueQr from "vue-qr";
export default {
  name: "test",
  components: {
    vueQr
  },
  data() {
    return {
      qrcode: "",
      value: ""
    };
  },
  mounted() {},
  methods: {
    handlerQrcode() {
      if (!this.value) {
        this.$toast.warning("请输入转换信息");
        return;
      }
      this.qrcode = this.value;
    },
    handlerClear() {
      this.qrcode = this.value = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>