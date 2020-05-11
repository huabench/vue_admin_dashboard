<template>
  <transition name="slide-in-right" enter-active-class="animated slideInRight">
    <div
      v-show="show"
      class="request"
      :class="{'dark-request': !isDarkMode, 'light-request': isDarkMode}"
    >
      Don’t have an account?
      <router-link to="/request">Request an account</router-link>
    </div>
  </transition>
</template>

<script>
export default {
  name: "RequestAccount",
  data() {
    return {
      show: false
    };
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  mounted() {
    this.show = true;
  }
};
</script>

<style lang="scss" scoped>
.request {
  position: absolute;
  right: 10px;
  top: 20px;
  @media (max-width: 600px) {
    top: 10px;
  }
}

.light-request {
  color: rgba(255, 255, 255, 0.3);
  a {
    color: white;
  }
}

.dark-request {
  color: rgba(0, 0, 0, 0.3);
  a {
    color: black;
  }
}
</style>