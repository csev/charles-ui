<template>
  <promised :promise="request" v-slot:combined="{ isPending, isDelayOver }">
    <div class="ui active inverted dimmer" v-if="isPending && isDelayOver">
      <div class="ui text loader">Loading</div>
    </div>
    <div class="ui centered grid" v-if="!WebToken.authenticated">
      <div class="row">
        <h2 class="ui icon header">
          <i class="circular shield icon"></i>
          <div class="content">
            Login
            <div class="sub header">Login with a <b>username</b>, <b>email</b> and <b>password</b>.</div>
          </div>
        </h2>
      </div>
      <div class="row">
        <div class="ui left icon input" :class="{ error: WebToken.errored }">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            @keypress.enter="login">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="ui left icon input" :class="{ error: WebToken.errored }">
          <input
            type="text"
            placeholder="Email"
            v-model="email"
            @keypress.enter="login">
          <i class="mail icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="ui left icon input" :class="{ error: WebToken.errored }">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            @keypress.enter="login">
          <i class="key icon"></i>
        </div>
      </div>
      <div class="row">
        <button class="ui primary button" @click="login">Login</button>
      </div>
    </div>
    <div class="ui centered grid" v-else>
      <div class="row">
        <h2 class="ui icon header">
          <i class="circular shield icon"></i>
          <div class="content">
            Logout
            <div class="sub header">Click the button below to logout.</div>
          </div>
        </h2>
      </div>
      <div class="row">
        <button class="ui primary button" @click="logout">Logout</button>
      </div>
    </div>
  </promised>
</template>

<script>
import { FIRE_API } from "~/assets/settings.js";
import WebToken from "~/assets/fire-data/webtoken.js";

export default {
  data() {
    return {
      WebToken,
      username: "",
      email: "",
      password: "",
      request: null
    };
  },
  methods: {
    async login() {
      this.request = WebToken.authenticate(`${FIRE_API}/v1/authentication`, {
        data: {
          attributes: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        }
      });

      await this.request;

      if(WebToken.errored) {
        for(let error of WebToken.errors) {
          this.$store.commit("message/add", {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      } else {
        this.$store.commit("message/add", {
          class: "success",
          title: "Login Success",
          detail: [ "You have sucessfully logged in." ],
          timeout: 5
        });
        this.username = "";
        this.email = "";
        this.password = "";
      }
    },
    async logout() {
      WebToken.deauthenticate();
    }
  }
}
</script>
