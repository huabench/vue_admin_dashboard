<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <Notification v-if="hasText" :text="text" />
    <RequestAccount />
    <div class="login">
      <img src="@/assets/DCHQ.svg" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" v-show="!isDarkMode" />
      <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Sign into Design+Code HQ</h4>
      <form @submit.prevent="onSubmit">
        <input
          type="email"
          :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
          placeholder="Email"
          v-model="email"
          required
        />
        <input
          type="password"
          :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
          placeholder="Password"
          v-model="password"
          required
        />
        <button>Sign In</button>
      </form>
      <router-link
        to="/recover"
        :class="{'dark-link': !isDarkMode, 'light-link': isDarkMode}"
      >Forget your password?</router-link>
      <ThemeSwitch />
    </div>
  </div>
</template>

<script>
import RequestAccount from "@/components/RequestAccount";
import ThemeSwitch from "@/components/ThemeSwitch";
import Notification from "@/components/Notification";
import { auth } from "@/main";

export default {
  name: "SignIn",
  components: {
    RequestAccount,
    ThemeSwitch,
    Notification
  },
  data() {
    return {
      email: null,
      password: null,
      hasText: false,
      text: ""
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
      const password = this.password;
      auth
        .login(email, password, true)
        .then(() => {
          //alert("right");
          this.$router.replace("/");
        })
        .catch(error => {
          alert("error: " + error);
        });
    }
  },
  mounted() {
    const params = this.$route.params;
    if (params.userLogout) {
      //alert("true");
      this.hasText = true;
      this.text = "You have logged out!";
    } else if (params.userRecoveredAccount) {
      this.hasText = true;
      this.text = "A recovery email has been sent to " + params.email;
    } else if (params.userRequestAccount) {
      this.hasText = true;
      this.text = `Your request has been sent to the administrator for ${params.email}!`;
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
