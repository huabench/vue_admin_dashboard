<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <div class="login">
      <img src="@/assets/DCHQ.svg" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" v-show="!isDarkMode" />
      <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Request Account</h4>
      <form @submit.prevent="onSubmit">
        <input
          type="email"
          :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
          placeholder="Email"
          v-model="email"
          required
        />
        <button>Request Account</button>
      </form>
      <router-link
        to="/signIn"
        :class="{'dark-link': !isDarkMode, 'light-link': isDarkMode}"
      >Already have an account? Sign in Now</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Recover",
  components: {
    ThemeSwitch
  },
  data() {
    return {
      email: null
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    onSubmit() {
      const email = this.email;
      // slack API
      let slackURL = new URL("https://slack.com/api/chat.postMessage");
      const data = {
        token: "xoxb-1079353283621-1086909886132-8zPSDwytt9ol3AYrDe6l1GHM",
        channel: "stone",
        text: `${email} has requested admin to HQ. Please go to netlify to invite them`
      };
      slackURL.search = new URLSearchParams(data);
      fetch(slackURL)
        .then(() => {
          //alert("response" + response.channel);
          this.$router.push({
            name: "SignIn",
            params: {
              userRequestAccount: true,
              email: email
            }
          });
        })
        .catch(error => {
          alert("the error: " + error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 100vh;
}

.login {
  width: 400px;
}
</style>
