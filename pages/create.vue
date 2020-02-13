<template>
  <div class="ui container">
    <div class="ui segment">
      <div class="ui one column centered grid">
        <div class="column">
          <div class="row">
            <json-editor v-model="json"></json-editor>
          </div>
          <div class="row">
            <button class="ui button" @click="createRecord">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";
import { elasticsearch } from "~/assets/elasticsearch.js";

import jsonEditor from "~/components/jsonEditor.vue";

export default {
  components: {
    jsonEditor
  },
  data() {
    return {
      WebToken,
      json: { },
      request: null
    };
  },
  methods: {
    async createRecord() {
      this.request = elasticsearch('_doc', {
        method: "POST",
        index: WebToken.payload.data.id,
        body: this.json
      });
      await this.request;
    }
  }
}
</script>
