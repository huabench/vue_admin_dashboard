<template>
  <transition appear appear-active-class="animated flipInX">
    <a
      class="card"
      :class="{'dark-card': isDarkMode, 'light-card': !isDarkMode}"
      :transition="transitionName"
      :style="delayTime"
    >
      <img
        :src="require(`@/assets/` + filename)"
        class="card-header"
        :class="{'dark-header': isDarkMode, 'light-header': !isDarkMode}"
      />
      <h3>{{title}}</h3>
      <p :class="{'dark-text': isDarkMode, 'light-text': !isDarkMode}">{{content}}</p>
    </a>
  </transition>
</template>

<script>
export default {
  name: "card",
  props: {
    filename: String,
    title: String,
    content: String,
    delayTime: String
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  height: 400px;
  width: 100%;
  max-width: 300px;
  margin: 20px;
  border-radius: 10px;
  //animation-delay: 2s;
}

.card-header {
  width: 100%;
  border-radius: 10px 10px 0 0;
}

.light-header {
  background: $light-gray;
}

.dark-header {
  background: #283049;
}

h3 {
  @include large-text($white);
  margin-bottom: 16px;
}

p {
  font-size: 15px;
  line-height: 24px;
  text-align: left;
  margin-left: 16px;
  margin-right: 16px;
  margin-top: 0;
}

.light-card {
  background: $white;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);

  &:hover {
    box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.25);
  }
}

.dark-card {
  background: $super-dark-blue;
  box-shadow: 0px 15px 30px rgba(255, 255, 255, 0.15);

  &:hover {
    box-shadow: 0px 30px 60px rgba(255, 255, 255, 0.25);
  }
}
</style>