<template>
  <div class="container">
    <h2>Team</h2>
    <div class="cards">
      <card
        filename="slack.png"
        title="Slack"
        content="Messaging app for all team communication."
        delayTime="animation-delay: 0s"
      />
      <card
        filename="notion.png"
        title="Notion"
        content="All-in-one workspace."
        delayTime="animation-delay: 0.5s"
      />
      <card
        filename="figma.png"
        title="Figma"
        content="Collaborative design tool."
        delayTime="animation-delay: 1s"
      />
      <card
        filename="contentful.png"
        title="contentful"
        content="Content management system."
        delayTime="animation-delay: 1.5s"
      />
      <card
        filename="dropbox.png"
        title="dropbox"
        content="Storage space in the cloud"
        delayTime="animation-delay: 2s"
      />
    </div>
  </div>
</template>

<script>
import card from "@/components/Card.vue";
export default {
  name: "Team",
  components: {
    card
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-left: 25px;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: space-evenly;
}

h2 {
  @include heading-2;
}
</style>