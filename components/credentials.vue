<template>
  <promised :promise="request" v-slot:combined="{ isPending, isDelayOver }">
    <div>
    <div class="ui active inverted dimmer" v-if="isPending && isDelayOver">
      <div class="ui text loader">Loading</div>
    </div>
      <div class="ui grid centered">
        <div class="row">
          <h2 class="ui icon header">
            <i class="circular user icon"></i>
            <div class="content">
              Account Credentials
              <div class="sub header" v-if="WebToken.authenticated">Manage your <b>username</b>, <b>email</b> and <b>password</b> below.</div>
              <div class="sub header" v-else>Create an account below.</div>
            </div>
          </h2>
        </div>
        <div class="row">
          <div class="ui left icon input">
            <input type="text" placeholder="Username" v-model="model.attributes.username">
            <i class="user icon"></i>
          </div>
        </div>
        <div class="row">
          <div class="ui left icon input">
            <input type="text" placeholder="Email" v-model="model.attributes.email">
            <i class="mail icon"></i>
          </div>
        </div>
        <div class="row">
          <div class="ui left icon input">
            <input type="password" placeholder="Password" v-model="model.attributes.password">
            <i class="shield icon"></i>
          </div>
        </div>
        <div class="row">
          <div class="ui left icon input">
            <input type="password" placeholder="Confirm" v-model="passwordConfirmation">
            <i class="shield icon"></i>
          </div>
        </div>
        <div class="row">
          <button class="ui green button" @click="createOrUpdate" v-if="WebToken.authenticated">Save</button>
          <button class="ui green button" @click="createOrUpdate" v-else>Create</button>
        </div>
      </div>
    </div>
  </promised>
</template>

<script>
import { FIRE_API } from "~/assets/settings.js";
import WebToken from "~/assets/fire-data/webtoken.js";
import { Model } from "~/assets/fire-data/model.js";

export default {
  data() {
    return {
      WebToken,
      model: new Model({
        host: FIRE_API,
        uri: "v1",
        type: "users"
      }),
      request: null,
      passwordConfirmation: "",
    };
  },
  methods: {
    async loadModel() {
      if(WebToken.authenticated) {
        this.model.id = WebToken.payload.data.id;
        this.request = this.model.load();
        await this.request;
        delete this.model.attributes.key;
      }
    },
    async createOrUpdate() {
      if(this.model.password && !(this.model.attributes.password === this.passwordConfirmation)) {
        this.$store.commit("message/add", {
          class: "error",
          title: "Password Error",
          detail: [ "Password does not match confirmation." ],
          timeout: 5
        });
        return null;
      }
      this.request = this.model.save();
      await this.request;
      if(this.model.errored) {
        for(let error of this.model.errors) {
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
          title: "Create/Update Success",
          detail: [ "User created or updated." ],
          timeout: 5
        });
        this.passwordConfirmation = "";
      }
    }
  },
  async mounted() {
    await this.loadModel();
  }
}
</script>
