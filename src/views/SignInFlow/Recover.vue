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
        <button>Send Email</button>
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
import { auth } from "@/main";

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
      auth
        .requestPasswordRecovery(email)
        .then(() => {
          this.$router.push({
            name: "SignIn",
            params: {
              userRecoveredAccount: true,
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
  @media (max-width: 600px) {
    width: 70%;

    img {
      margin-top: 60px;
      width: 120px;
    }

    h4 {
      font-size: 20px;
    }

    input {
      font-size: 18px;
      height: 40px;
    }

    button {
      height: 40px;
      font-size: 16px;
      margin-bottom: 20px;
    }
    a {
      font-size: 16px;
    }
  }
}
</style>
