<template>
  <div class="ui container">
    <div class="ui grid centered">
      <div class="row">
        <h2 class="ui icon header">
          <i class="settings icon"></i>
          <div class="content">
            Account Settings
            <div class="sub header">Manage your account settings and  preferences here.</div>
          </div>
        </h2>
      </div>
    </div>
    <div class="ui two column stackable grid">
      <credentials class="column" :model="model" />
      <div class="column">
        <div class="ui grid centered container">
          <div class="row">
            <h2 class="ui center aligned icon header">
              <i class="circular users icon"></i>
              Activation Instructions
              <div class="sub header">Activate your account to receive superior service.</div>
            </h2>
          </div>
        </div>
        <div class="ui grid container">
          <div class="row">
            <div class="ui list">
              <a class="item">
                <i class="mail icon"></i>
                <div class="content">
                  <div class="header">Email</div>
                  <div class="description">Upon submitting the credentials form, an email will be sent to the provided email address with a confirmation key.</div>
                </div>
              </a>
              <a class="item">
                <i class="thumbs up icon"></i>
                <div class="content">
                  <div class="header">Confirmation</div>
                  <div class="description">Enter your confirmation key below to verify your email address and activate your account.</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HOST } from "~/assets/settings.js";

import WebToken from "~/assets/fire-data/webtoken.js";
import { Model } from "~/assets/fire-data/model.js";

import activation from "~/components/activation.vue";
import credentials from "~/components/credentials.vue";

let model = new Model({
  host: HOST,
  uri: "v1",
  type: "users",
  attributes: { }
});

export default {
  data() {
    return {
      WebToken,
      model: model
    };
  },
  async created() {
    if(WebToken.authenticated && WebToken.payload) {
      this.model.id = WebToken.payload.data.id;
      await this.model.load();
    }
  },
  components: {
    credentials
  }
}
</script>

<style lang="scss" scoped>
</style>
