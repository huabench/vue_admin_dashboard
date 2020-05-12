<template>
  <div class="home">
    <Header />
    <div class="container">
      <button v-on:click="sendMessage">send msg</button>
      <button v-on:click="getEspData">get data</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { auth } from "@/main";

export default {
  name: "Home",

  components: {
    Header
  },

  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },

  mounted() {
    this.phoneNumber = auth.currentUser().user_metadata.phone_number;
  },

  data() {
    return {
      ESPData: null
    };
  },

  methods: {
    sendMessage() {
      console.log("send message");
      const bodyObject = {
        to: this.phoneNumber,
        msg: "this is a message from Ben"
      };
      //fetch("http://localhost:9000/sendSMS", {
      fetch("/.netlify/functions/sendSMS", {
        method: "POST",
        body: JSON.stringify(bodyObject)
      });
    },
    getEspData() {
      console.log("get data from esp8266");
      //fetch("/.netlify/functions/getDataFromEsp", {
      //fetch("http://localhost:9000/getDataFromEsp", {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var response = JSON.parse(xhttp.responseText);
          this.ESPData = response.data;
        }
      };
      xhttp.open("GET", "/.netlify/functions/getDataFromEsp", true);
      xhttp.setRequestHeader("Access-Control-Allow-Origin", "origin-list");
      xhttp.send();
      this.updateGrid();
    },
    updateGrid() {
      console.log("haha I got data:" + this.ESPData);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-left: 15%;
  margin-right: 15%;
}

h1.black {
  @include heading-3($black);
}

h1.white {
  @include heading-3($white);
}
</style>
