<template>
  <div
    class="toggle"
    :class="[{'big': !isSmall, 'small': isSmall}, {'light-toggle': !isDarkMode, 'dark-toggle': isDarkMode}]"
    v-on:click="toggleDarkMode"
  >
    <div
      class="toggle-switch"
      :class="[{'big': !isSmall, 'small': isSmall}, {'toggle-left': !isDarkMode, 'toggle-right': isDarkMode}]"
    >
      <img v-show="!isDarkMode" src="@/assets/sun.svg" />
      <img v-show="isDarkMode" src="@/assets/moon.svg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ThemeSwitch",
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    },
    isSmall() {
      return this.size == "small";
    }
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("toggleDarkMode");
    }
  },
  props: {
    size: String
  }
};
</script>

<style lang="scss" scoped>
.toggle {
  //height: 68px;
  box-sizing: border-box;
  display: flex;
}
.toggle.big {
  width: 175px;
  margin: 50px auto;
  border-radius: 10px;
}

.toggle.small {
  width: 100px;
  margin: 0px auto;
  border-radius: 5px;
}

.light-toggle {
  background: linear-gradient(346.78deg, #f7fcfc 0%, #fafcfa 100%);
  border: 1px solid rgba(0, 0, 0, 0.04);
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.1);
}

.dark-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  box-shadow: inset 0px 5px 10px rgba(255, 255, 255, 0.1);
}

.toggle-switch {
  margin: 2px;
}

.toggle-switch.big {
  padding: 15px 35px;
  border-radius: 8px;
}

.toggle-switch.small {
  padding: 6px 16px;
  border-radius: 4px;
}

.toggle-left {
  transform: translateX(0);
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

.toggle-right {
  transform: translateX(90%);
  background: #1b233f;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
</style>