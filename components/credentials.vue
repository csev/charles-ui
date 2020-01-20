<template>
  <div class="ui two column grid centered container">
    <div v-if="!WebToken.authenticated" class="row">
      <h2>Credentials</h2>
    </div>
    <div v-else class="row">
      <h2>Details</h2>
    </div>
    <div class="row">
      <div class="ui large left icon input" :class="{ success: WebToken.authenticated, error: WebToken.errored }">
        <input v-model="model.attributes.username" type="text" placeholder="Username">
        <i class="user icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="ui large left icon input" :class="{ success: WebToken.authenticated, error: WebToken.errored }">
        <input v-model="model.attributes.email" type="text" placeholder="Email">
        <i class="mail icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="ui large left icon input" :class="{ success: WebToken.authenticated, error: WebToken.errored }">
        <input v-model="model.attributes.password" type="password" placeholder="Password">
        <i class="shield icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="ui large left icon input" :class="{ success: WebToken.authenticated && model.attributes.key, info: WebToken.authenticated && !model.attributes.key, error: WebToken.errored }">
        <input v-model="model.attributes.key" type="password" placeholder="Key">
        <i class="key icon"></i>
      </div>
    </div>
    <div v-if="!WebToken.authenticated" class="row">
      <button class="ui primary basic button" @click="create">Create</button>
      <button class="ui primary button" @click="login">Login</button>
    </div>
    <div v-else class="row">
      <button class="ui primary basic button" @click="save">Save</button>
      <button class="ui primary button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { HOST } from "~/assets/settings.js";

import WebToken from "~/assets/fire-data/webtoken.js";

export default {
  props: {
    model: Object
  },
  data() {
    return {
      WebToken
    }
  },
  methods: {
    async create() {
      let username = this.model.attributes.username;
      let password = this.model.attributes.password;

      await this.model.save();

      if(this.model.errored) {
        for(let error of this.model.errors) {
          this.$store.commit('message/add', {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      } else {
        await WebToken.authenticate(`${HOST}/v1/authentication`, {
          data: {
            attributes: {
              username: username,
              password: password
            }
          }
        });
        await this.model.load();
      }
    },
    async save() {
      await this.model.save();
      if(this.model.errored) {
        for(let error of this.model.errors) {
          this.$store.commit('message/add', {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      }
      await this.model.load();
    },
    async login() {
      await WebToken.authenticate(`${HOST}/v1/authentication`, {
        data: {
          attributes: {
            username: this.model.attributes.username,
            email: this.model.attributes.email,
            password: this.model.attributes.password
          }
        }
      });
      if(WebToken.errored) {
        for(let error of WebToken.errors) {
          this.$store.commit('message/add', {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      } else {
        this.model.id = WebToken.payload.data.id;
        await this.model.load();
      }
    },
    async logout() {
      await WebToken.deauthenticate();
      this.model.clear();
    }
  }
}
</script>
