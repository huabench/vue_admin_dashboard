<template>
  <div class="home">
    <Header />
    <div class="container">
      <div class="battery">
        <img
          :class="{ 'dark-battery': !isDarkMode, 'light-battery': isDarkMode}"
          src="@/assets/battery.svg"
        />
      </div>
      <div class="Input" :class="{ 'dark-input': isDarkMode, 'light-input': !isDarkMode }">
        <h4 :class="{ 'light-text': !isDarkMode, 'dark-text': isDarkMode }">{{this.statusTitle}}</h4>
        <p :class="{ 'light-text': !isDarkMode, 'dark-text': isDarkMode }">{{this.statusText}}</p>
      </div>

      <div class="Grid" :class="{ 'dark-input': isDarkMode, 'light-input': !isDarkMode }">
        <div
          id="grid-1"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">1</p>
        </div>
        <div
          id="grid-2"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">2</p>
        </div>
        <div
          id="grid-3"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">3</p>
        </div>
        <div
          id="grid-4"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">4</p>
        </div>
        <div
          id="grid-5"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">5</p>
        </div>
        <div
          id="grid-6"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">6</p>
        </div>
        <div
          id="grid-7"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">7</p>
        </div>
        <div
          id="grid-8"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">8</p>
        </div>
        <div
          id="grid-9"
          class="grid"
          :class="{ 'dark-grid': !isDarkMode, 'light-grid': isDarkMode }"
        >
          <p :class="{ 'light-text': isDarkMode, 'dark-text': !isDarkMode }">9</p>
        </div>
      </div>

      <button v-on:click="sendMessage">send msg</button>
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
    var parent = this;
    this.phoneNumber = auth.currentUser().user_metadata.phone_number;
    //this.updateGrid();
    setInterval(function() {
      parent.getEspData();
    }, 1000);
  },

  data() {
    return {
      ESPData: "",
      statusText: "Your baby might leaving the mattress, please have a look.",
      statusTitle: "NOT ON"
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
      })
        .then(response => console("response is :", response))
        .catch(err => alert("err is:", err));
    },
    getEspData() {
      console.log("get data from esp8266");
      //fetch("/.netlify/functions/getDataFromEsp", {
      //fetch("http://localhost:9000/getDataFromEsp", {
      var xhttp = new XMLHttpRequest();
      var parent = this;
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          var response = xhttp.responseText;
          //response = "TFTFTFTFF";
          //console.log("response is:", response);
          parent.ESPData = response;
          parent.updateGrid();
        }
      };
      xhttp.open("GET", "/.netlify/functions/getDataFromEsp", true);
      xhttp.send();
    },
    updateGrid() {
      console.log("haha I got data:" + this.ESPData);
      //this.ESPData = "TFTFTFTFF";
      var count = 0;
      for (var i = 0; i < 9; i++) {
        var isTouched = this.ESPData.substring(i, i + 1);
        if (isTouched == "T") {
          document.getElementById(
            "grid-" + String(i + 1)
          ).style.backgroundColor = "#56ccf2";
          count += 1;
        } else if (isTouched == "F") {
          document.getElementById(
            "grid-" + String(i + 1)
          ).style.backgroundColor = !this.isDarkMode ? "#e3f2fd" : "white";
        }
        if (count == 0) {
          this.statusTitle = "NOT ON";
          this.statusText =
            "Your baby might leaving the mattress, please have a look.";
        } else if (count > 6) {
          this.statusTitle = "ON";
          this.statusText = "Your baby is on the mattress, safe and sound.";
        } else {
          this.statusTitle = "PARTIALLY ON";
          this.statusText =
            "Your baby is partially on the mattress, playing around.";
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-left: 15%;
  margin-right: 15%;
}

.red {
  h4,
  p {
    color: red;
  }
}

h1.black {
  @include heading-3($black);
}

h1.white {
  @include heading-3($white);
}

.light-grid {
  background: $white;
}

.dark-grid {
  background: #e3f2fd;
}

.Grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin: 20px auto;
  max-width: 600px;
  width: 80%;
  border-radius: 20px;
  padding: 20px;
}

.grid {
  padding-left: 100%;
  padding: 30%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
}

.battery {
  display: flex;
  justify-content: right;
  position: relative;
  margin-top: 10px;
  img {
    width: 24px;
    position: absolute;
    right: 0;
    fill: white;
  }
}

.dark-battery {
  color: black;
}

.light-battery {
  color: white;
}
</style>
