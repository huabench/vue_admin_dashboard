<template>
  <div class="home">
    <Header />
    <div class="container">
      <div class="spread">
        <h1 :class="{'black': !isDarkMode, 'white': isDarkMode}">Traffic Overview</h1>
        <div class="toggle" :class="{'light-box': isDarkMode, 'dark-box': !isDarkMode}">
          <div ref="days" class="days" @click="toggleDays">Days</div>
          <div ref="weeks" class="weeks" @click="toggleWeeks">Weeks</div>
          <div ref="months" class="months" @click="toggleMonths">Months</div>
        </div>
      </div>
      <apexchart width="100%" type="area" :options="options" :series="series"></apexchart>
      <iframe
        v-show="isDarkMode"
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/a078b55e-86df-41e4-89e1-23d4fa81acb4/page/6odNB"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
      <iframe
        v-show="!isDarkMode"
        width="600"
        height="450"
        src="https://datastudio.google.com/embed/reporting/b35983de-7843-4fcb-b052-31e96a55601a/page/6odNB"
        frameborder="0"
        style="border:0"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import VueApexCharts from "vue-apexcharts";
import { db } from "@/firebase";

export default {
  name: "Home",
  firestore() {
    return {
      traffic: {
        // collection reference.
        ref: db.collection("Traffic"),
        // Bind the collection as an object if you would like to.
        objects: true,
        resolve: traffic => {
          // collection is resolved
          const activeUsers = Object.values(traffic.activeUsers);
          const newUsers = Object.values(traffic.newUsers);
          this.series = [
            { name: "active users", data: activeUsers },
            { name: "new users", data: newUsers }
          ];
        },
        reject: err => {
          alert(err);
          // collection is rejected
        }
      }
    };
  },
  data() {
    return {
      options: {
        colors: ["#14f1d9", "#7b42f6"],
        legend: {
          labels: {
            colors: [this.$store.getters.isDarkMode ? "white" : "black"]
          },
          position: "top"
        },
        tooltip: { theme: "dark" },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: false
            }
          }
        },
        chart: {
          id: "users"
        },
        xaxis: {
          type: "datetime"
        }
      },
      series: []
    };
  },
  components: {
    Header,
    apexchart: VueApexCharts
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.isDarkMode;
    }
  },
  methods: {
    toggleDays() {
      this.$refs.days.style.color = "white";
      this.$refs.days.style.background = "#56CCF2";
      this.$refs.days.style.borderRadius = "4px";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";
    },
    toggleWeeks() {
      this.$refs.weeks.style.color = "white";
      this.$refs.weeks.style.background = "#56CCF2";
      this.$refs.weeks.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.months.style.color = "#5b6175";
      this.$refs.months.style.background = "none";
      this.$refs.months.style.borderRadius = "none";
    },
    toggleMonths() {
      this.$refs.months.style.color = "white";
      this.$refs.months.style.background = "#56CCF2";
      this.$refs.months.style.borderRadius = "4px";

      this.$refs.days.style.color = "#5b6175";
      this.$refs.days.style.background = "none";
      this.$refs.days.style.borderRadius = "none";

      this.$refs.weeks.style.color = "#5b6175";
      this.$refs.weeks.style.background = "none";
      this.$refs.weeks.style.borderRadius = "none";
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-left: 15%;
  margin-right: 15%;
}

.spread {
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  width: 100%;
}

.toggle {
  @include medium-text;
  color: $dark-gray;
  height: 50px;
  width: 240px;
  border-radius: 6px;
  padding: 5px;
  display: flex;
  flex-wrap: nowrap;

  &:hover {
    cursor: pointer;
  }
}

@mixin toggle-settings {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  height: 100%;
}

.days {
  @include toggle-settings;
  background: $teal;
  color: $white;
  border-radius: 4px;
}

.weeks {
  @include toggle-settings;
}

.months {
  @include toggle-settings;
}

h1.black {
  @include heading-3($black);
}

h1.white {
  @include heading-3($white);
}
</style>