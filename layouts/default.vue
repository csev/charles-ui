<template>
  <div>
    <div class="ui container">
      <div class="ui menu">
        <div class="header item"><i class="fire layout icon"></i>Fire Ui</div>
        <div class="right menu">
          <nuxt-link class="item" :to="{ name: 'join' }" v-if="!WebToken.authenticated"><i class="users layout icon"></i>Join</nuxt-link>
          <nuxt-link class="item" :to="{ name: 'login' }" v-if="!WebToken.authenticated"><i class="shield layout icon"></i>Login</nuxt-link>
          <nuxt-link class="item" :to="{ name: 'logout' }" v-if="WebToken.authenticated"><i class="shield layout icon"></i>Logout</nuxt-link>
          <div id="dropdown-shopping" class="ui pointing dropdown link item" v-if="WebToken.authenticated">
            <span class="text"><i class="user layout icon"></i>Menu</span>
            <i class="dropdown icon"></i>
            <div class="menu">
              <nuxt-link class="item" :to="{ name: 'account' }"><i class="user layout icon"></i>Account</nuxt-link>
              <!--div class="header">Categories</div>
              <div class="item">
                <i class="dropdown icon"></i>
                <span class="text">Clothing</span>
                <div class="menu">
                  <div class="header">Mens</div>
                  <div class="item">Shirts</div>
                  <div class="item">Pants</div>
                  <div class="item">Jeans</div>
                  <div class="item">Shoes</div>
                  <div class="divider"></div>
                  <div class="header">Womens</div>
                  <div class="item">Dresses</div>
                  <div class="item">Shoes</div>
                  <div class="item">Bags</div>
                </div>
              </div>
              <div class="item">Home Goods</div>
              <div class="item">Bedroom</div>
              <div class="divider"></div>
              <div class="header">Order</div>
              <div class="item">Status</div>
              <div class="item">Cancellations</div-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ui container">
      <message id="messages" class="row" />
    </div>
    <div class="ui left vertical inverted sidebar labeled icon menu">
    </div>
    <nuxt />
  </div>
</template>

<script>
import Vue from "vue";

import message from "~/components/message.vue";
import { FIRE_LOGENTRIES_TOKEN } from "~/assets/settings.js";
import WebToken from "~/assets/fire-data/webtoken.js";

LE.init({
  token: FIRE_LOGENTRIES_TOKEN,
  page_info: 'per-entry',
  trace: true,
  print: true,
  catchall: true
});

export default {
  data() {
    return {
      WebToken
    };
  },
  watch: {
    "WebToken.authenticated": function() {
      Vue.nextTick(function() {
        $("#dropdown-shopping").dropdown();
      });
    }
  },
  mounted() {
    $("#dropdown-shopping").dropdown();
  },
  components: {
    message
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
</style>
