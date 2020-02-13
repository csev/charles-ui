<template>
  <div>
    <div class="ui container">
      <div class="ui menu fixed">
        <div class="header item"><i class="fire layout icon"></i>Charles UI</div>
        <div class="right menu">
          <div id="dropdown-menu" class="ui pointing dropdown link item" v-if="WebToken.authenticated">
            <span class="text"><i class="user layout icon"></i>Menu</span>
            <i class="dropdown icon"></i>
            <div class="menu">
              <nuxt-link class="item" :to="{ name: 'manage' }"><i class="list layout icon"></i>Manage</nuxt-link>
              <nuxt-link class="item" :to="{ name: 'create' }"><i class="asterisk layout icon"></i>Create</nuxt-link>
              <nuxt-link class="item" :to="{ name: 'search' }"><i class="search layout icon"></i>Search</nuxt-link>
            </div>
          </div>
          <nuxt-link class="item" :to="{ name: 'login' }" v-if="!WebToken.authenticated"><i class="shield layout icon"></i>Login</nuxt-link>
          <nuxt-link class="item" :to="{ name: 'logout' }" v-if="WebToken.authenticated"><i class="shield layout icon"></i>Logout</nuxt-link>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="ui container">
      <message id="messages" class="row" />
    </div>
    <div class="ui left vertical inverted sidebar labeled icon menu">
    </div>
    <nuxt />
  </div>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";

import message from "~/components/message.vue";

export default {
  data() {
    return {
      WebToken,
      searchTerm: "",
    };
  },
  watch: {
    "WebToken.authenticated": function() {
      this.$nextTick(function() {
        $("#dropdown-menu").dropdown();
      });
    }
  },
  mounted() {
    $("#dropdown-menu").dropdown();
  },
  components: {
    message
  },
  methods: {
    async search() {
      this.$router.push(`/search/${this.searchTerm}`)
    }
  }
}
</script>

<style lang="scss">
  html, body {
    min-height: 100%;
    background: fixed linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9)), center fixed url("/background.jpg");
  }

  #messages {
    margin: 13px 0px 13px 0px;
  }

  .spacer {
    height: 50px;
  }
</style>
