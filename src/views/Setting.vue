<template>
  <div>
    <Header />
    <div class="container">
      <div class="Input" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode}">
        <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Change Mode</h4>
        <p
          :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}"
        >Change between light mode and dark mode</p>
        <ThemeSwitch />
      </div>
      <div class="Input" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode}">
        <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Account Info</h4>
        <p
          :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}"
        >The infomation of your account</p>
        <div class="fields">
          <div class="account">
            ID
            <div
              class="field field-1"
              :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
            >{{this.email}}</div>
          </div>
          <div class="account">
            Phone
            <div
              class="field field-1"
              :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
            >{{getPhoneNumber}}</div>
          </div>
          <div class="account">
            Device
            <div
              class="field field-1"
              :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
            >{{getDeviceID}}</div>
          </div>
        </div>
      </div>
      <div class="Input" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode}">
        <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Phone Number</h4>
        <p
          :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}"
        >Messages will be sent to this new number</p>
        <form class="form" @submit.prevent="savePhoneNumber">
          <input
            type="tel"
            class="field"
            :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
            placeholder="Phone Number"
            v-model="inputPhonenumber"
            required
          />
          <button>Change</button>
        </form>
      </div>
      <div class="Input" :class="{'dark-input': isDarkMode, 'light-input': !isDarkMode}">
        <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Device ID</h4>
        <p :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Get data from this device</p>
        <form class="form" @submit.prevent="saveDeviceID">
          <input
            class="field"
            :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
            placeholder="Device ID"
            v-model="inputDeviceID"
            required
          />
          <button>Change</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import ThemeSwitch from "@/components/ThemeSwitch";
import { auth } from "@/main";

export default {
  name: "Setting",
  components: {
    Header,
    ThemeSwitch
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
    getPhoneNumber() {
      return this.phoneNumber || "no record";
    },
    getDeviceID() {
      return this.deviceID || "no record";
    }
  },
  methods: {
    savePhoneNumber() {
      this.user
        .update({ data: { phone_number: this.inputPhonenumber } })
        .then(user => {
          console.log("Updated user %s", user);
          window.location.reload();
        })
        .catch(error => {
          alert("Failed to update user: %o", error);
          throw error;
        });
    },

    saveDeviceID() {
      this.user
        .update({ data: { device_id: this.inputDeviceID } })
        .then(user => {
          console.log("Updated user %s", user);
          window.location.reload();
        })
        .catch(error => {
          alert("Failed to update user: %o", error);
          throw error;
        });
    }
  },
  data() {
    return {
      inputPhonenumber: null,
      inputDeviceID: null,
      phoneNumber: null,
      deviceID: null,
      email: null
    };
  },
  mounted() {
    this.user = auth.currentUser();
    this.email = this.user.email;
    console.log(this.user.user_metadata);
    this.phoneNumber = this.user.user_metadata.phone_number;
    this.deviceID = this.user.user_metadata.device_id;
  }
};
</script>

<style lang="scss" scoped>
.Input {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin: 20px auto;
  max-width: 500px;
  width: 70%;
  border-radius: 10px;
  padding: 20px;

  h4 {
    align-self: start;
    line-height: 20px;
    justify-self: center;
  }

  p {
    font-size: 10px;
    margin: 10px 0 0 0;
    align-self: start;
    line-height: 10px;
    margin-bottom: 0;
    justify-self: start;
  }
}

.light-input {
  background: $white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
}

.dark-input {
  background: $super-dark-blue;
  box-shadow: 0px 15px 30px rgba(255, 255, 255, 0.15);
}

.form {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding-right: 20px;
  padding-top: 20px;
  align-items: center;

  button {
    width: 30%;
    height: 40px;
    margin: 0;
  }
}

.field {
  width: 60%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  margin: 0;
}

.account {
  display: grid;
  grid-template-columns: 15% 85%;

  justify-items: center;
  align-items: center;
}

.fields {
  margin-top: 20px;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: 15px;
}

.field-1 {
  margin: 0;
  width: 80%;
}

@media (max-width: 600px) {
  button {
    font-size: 16px;
  }

  .field {
    font-size: 16px;
    padding-left: 10px;
  }

  h4 {
    font-size: 20px;
  }

  .account {
    font-size: 14px;
  }
}
</style>