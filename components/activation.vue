<template>
  <promised :promise="request" v-slot:combined="{ isPending, isDelayOver }">
    <div class="ui active inverted dimmer" v-if="isPending && isDelayOver">
      <div class="ui text loader">Loading</div>
    </div>
    <div v-if="model.attributes.key">
      <div class="ui grid centered">
        <div class="row">
          <h2 class="ui icon header">
            <i class="circular check icon"></i>
            <div class="content">
              Account Activated
              <div class="sub header">Your account <b>key</b> is displayed below.</div>
            </div>
          </h2>
        </div>
        <div class="row">
          <b>Key:</b>&nbsp{{ model.attributes.key }}
        </div>
        <div class="row">
          <button class="ui basic primary button" @click="deactivate">Deactivate</button>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="ui grid centered">
        <div class="row">
          <h2 class="ui icon header">
            <i class="circular check icon"></i>
            <div class="content">
              Account Activation
              <div class="sub header"></div>
            </div>
          </h2>
        </div>
      </div>
      <div class="ui grid container">
        <div class="row">
          <div class="ui list">
            <a class="item">
              <i class="mail icon"></i>
              <div class="content">
                <div class="header">Floated Icon</div>
                <div class="description">This text will always have a left margin to make sure it sits alongside your icon</div>
              </div>
            </a>
            <a class="item">
              <i class="key icon"></i>
              <div class="content">
                <div class="header">Icon Alignment</div>
                <div class="description">Floated icons are by default top aligned. To have an icon top aligned try this example.</div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div class="ui grid centered">
        <div class="row">
          <div class="ui left icon input">
            <input type="text" placeholder="Key" v-model="key" @keyup.any.prevent="activate">
            <i class="key icon"></i>
          </div>
        </div>
        <div class="row">
          <button class="ui green button" @click="resend">Resend</button>
          <button class="ui green button" @click="activate">Activate</button>
        </div>
      </div>
    </div>
  </promised>
</template>

<script>
import { FIRE_API } from "~/assets/settings.js";
import WebToken from "~/assets/fire-data/webtoken.js";
import { Model } from "~/assets/fire-data/model.js";

const model = new Model({
  host: FIRE_API,
  uri: "v1",
  type: "users",
  attributes: { }
});

export default {
  data() {
    return {
      WebToken,
      model,
      key: "",
      request: null
    };
  },
  async created() {
    if(WebToken.authenticated) {
      this.model.id = WebToken.payload.data.id;
      this.request = this.model.load();
      await this.request;
      if(this.model.errored) {
        for(let error of this.modol.errors) {
          this.$store.commit("message/add", {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      }
    }
  },
  methods: {
    async activate() {
      this.model.empty();
      this.model.attributes.key = this.key;
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
      }
    },
    async deactivate() {
      this.model.empty();
      this.model.attributes.key = "";
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
      }
    },
    async resend() {
      this.model.empty();
      this.model.attributes.key = "$action-resend";
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
      }
    }
  }
}
</script>
