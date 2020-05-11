<template>
  <div>
    <div id="nav" :class="{'nav-light': !isDarkMode, 'nav-dark': isDarkMode}">
      <div class="nav-1">
        <img src="@/assets/DCHQ-small-dark.svg" v-show="!isDarkMode" />
        <img src="@/assets/DCHQ-small.svg" v-show="isDarkMode" />
        <router-link to="/" :class="{'light-nav': isDarkMode, '': !isDarkMode}">Home</router-link>
        <router-link to="/setting" :class="{'light-nav': isDarkMode, '': !isDarkMode}">Setting</router-link>
      </div>
      <div class="nav-1">
        <a @click="onClick" class="logout">
          Logout
          <img src="@/assets/logout.svg" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/main";

export default {
  name: "Header",
  components: {},
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    onClick() {
      const user = auth.currentUser();
      user
        .logout()
        .then(() => {
          alert("you log out");
          this.$router.push({
            name: "SignIn",
            params: {
              userLogout: true
            }
          });
        })
        .catch(error => {
          alert("error: " + error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav-light {
  background: $white;
}

.nav-dark {
  background: $super-dark-blue;
}

#nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 15px 15%;
  a {
    font-weight: bold;
    color: $dark-gray;

    &.router-link-exact-active {
      color: $middle-blue;
    }
    &.router-link-exact-active.light-nav {
      color: $white;
    }
  }

  @media (max-width: 720px) {
    padding: 5px 20px;
    a {
      font-size: 12px;
    }
  }
}

.nav-1 {
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    margin-left: 20px;
    margin-right: 20px;
  }

  img {
    margin-right: 20px;
    margin-left: 5px;
  }
  @media (max-width: 720px) {
    a {
      margin-left: 10px;
      margin-right: 10px;
    }

    img {
      margin-right: 10px;
      margin-left: 5px;
    }
  }
}

.logout {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
</style>