<template>
  <div class="home">
    <Header />
    <div class="container">
      <button>send msg</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import { auth } from "@/main";

export default {
  name: "Home",
  data() {
    return {};
  },
  components: {
    Header
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  mounted() {
    this.phoneNumber = auth.currentUser().user_metadata.phone_number;
    alert(this.phoneNumber);
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-left: 15%;
  margin-right: 15%;
}

h1.black {
  @include heading-3($black);
}

h1.white {
  @include heading-3($white);
}
</style>