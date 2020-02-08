<template>
  <div class="ui container">
    <div class="ui segment" v-if="WebToken.authenticated">
      <div class="ui two column mobile reversed stackable grid">
        <credentials class="column" />
        <activation class="column" />
      </div>
      <div class="ui vertical divider">
        <i class="fire icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { HOST } from "~/assets/settings.js";

import WebToken from "~/assets/sugar-data/webtoken.js";

import authentication from "~/components/authentication.vue";
import activation from "~/components/activation.vue";
import credentials from "~/components/credentials.vue";

export default {
  data() {
    return {
      WebToken
    };
  },
  components: {
    activation,
    authentication,
    credentials
  }
}
</script>

<style lang="scss" scoped>
</style>
