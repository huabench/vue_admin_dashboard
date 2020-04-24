<template>
  <div>
    <div id="nav" :class="{'nav-light': !isDarkMode, 'nav-dark': isDarkMode}">
      <div class="nav-1">
        <img src="@/assets/DCHQ-small-dark.svg" v-show="!isDarkMode" />
        <img src="@/assets/DCHQ-small.svg" v-show="isDarkMode" />
        <router-link to="/" :class="{'light-nav': isDarkMode, '': !isDarkMode}">Home</router-link>
        <router-link to="/manage" :class="{'light-nav': isDarkMode, '': !isDarkMode}">Manage Users</router-link>
        <router-link to="/team" :class="{'light-nav': isDarkMode, '': !isDarkMode}">Team</router-link>
      </div>
      <div class="nav-1">
        <a @click="onClick" class="logout">
          Logout
          <img src="@/assets/logout.svg" />
        </a>
        <ThemeSwitch size="small" />
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "@/main";
import ThemeSwitch from "@/components/ThemeSwitch";

export default {
  name: "Header",
  components: {
    ThemeSwitch
  },
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
  padding: 30px;
  box-sizing: border-box;
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
}

.nav-1 {
  display: flex;
  align-items: center;

  a {
    margin-left: 20px;
    margin-right: 20px;
  }

  img {
    margin-right: 20px;
  }
}

.logout {
  &:hover {
    cursor: pointer;
  }
}
</style>