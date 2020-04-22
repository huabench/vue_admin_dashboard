<template>
  <div class="container" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <RequestAccount />
    <div class="login">
      <img src="@/assets/DCHQ.svg" v-show="isDarkMode" />
      <img src="@/assets/DCHQ-dark.svg" v-show="!isDarkMode" />
      <h4 :class="{'light-text': !isDarkMode, 'dark-text': isDarkMode}">Sign into Design+Code HQ</h4>
      <input
        type="email"
        :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
        placeholder="Email"
      />
      <input
        type="password"
        :class="{'dark-field': !isDarkMode, 'light-field': isDarkMode}"
        placeholder="Password"
      />
      <button>Sign In</button>
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
export default {
  name: "SignIn",
  components: {
    RequestAccount,
    ThemeSwitch
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
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