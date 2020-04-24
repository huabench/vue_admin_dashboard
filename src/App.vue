<template>
  <div id="app" :class="{'light-background': !isDarkMode, 'dark-background': isDarkMode}">
    <router-view />
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "App",
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  mounted() {
    const isDarkMode = this.$store.getters.isDarkMode;
    document.body.style.background = isDarkMode ? "#212c4f" : "#f0f3f5";
  }
};
</script>>

<style lang="scss">
* {
  transition: 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

body {
  background-color: $dark-blue;
  margin: 0;
}

line,
text {
  opacity: 0.2;
}

h1 {
  @include heading-1;
}

p {
  @include large-text($purple);
}

h4 {
  margin: 0;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 34px;
  /* identical to box height */
  text-align: center;
}

input {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  width: 100%;
  height: 60px;

  font-size: 20px;
  color: white;
  padding-left: 20px;
  margin-top: 20px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}

button {
  background: #56ccf2;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 20px;
  border: none;
  font-size: 20px;
  color: white;
  width: 100%;
  height: 60px;
  border: none;
  margin-bottom: 40px;
}

a {
  line-height: 25px;
  text-align: center;
  text-decoration: none;
}

#app {
  font-family: $system-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $white;
}

// Theme
.light-background {
  background-color: $light-gray;
  line,
  text {
    stroke: $dark-blue;
  }
}

.dark-background {
  background-color: $dark-blue;
  line,
  text {
    stroke: $light-gray;
  }
}

.light-text {
  color: black;
}

.dark-text {
  color: white;
}

.light-field {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: $white;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
}

.dark-field {
  background: rgba(198, 208, 235, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  color: $black;

  &::placeholder {
    color: rgba(0, 0, 0, 0.3);
  }
}

.light-link {
  color: rgba(255, 255, 255, 0.3);
}

.dark-link {
  color: rgba(0, 0, 0, 0.3);
}

.light-box {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.dark-box {
  background: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
