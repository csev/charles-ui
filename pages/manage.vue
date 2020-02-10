<template>
  <promised :promise="request">
    <template v-slot:pending>
      <div class="ui active inverted dimmer">
        <div class="ui text loader">Loading...</div>
      </div>
    </template>
    <template v-slot:default>
      <div class="ui container">
        <div class="ui segment">
          <div class="ui centered grid">
            <div class="row">
              <button class="ui button" @click="dropIndex" v-if="index.exists">Drop Index</button>
              <button class="ui button" @click="createIndex" v-else>Create Index</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </promised>
</template>

<script>
import { SUGAR_API } from "~/assets/settings.js";
import WebToken from "~/assets/sugar-data/webtoken.js";

export default {
  data() {
    return {
      WebToken,
      json: { },
      request: null,
      index: {
        exists: false
      }
    }
  },
  async mounted() {
    await this.checkIndex();
  },
  methods: {
    async elasticsearch(uri='', options={ }) {
      uri = `${SUGAR_API}/v1/elasticsearch/${WebToken.payload.data.id}/${uri}`;

      if(!options.headers) {
        options.headers = { };
      }

      _.assignIn(options.headers, {
        "Authorization": `Bearer ${WebToken.token}`
      });

      let response = await fetch(uri, options);

      return await response.json();
    },
    async checkIndex() {
      this.request = this.elasticsearch();
      this.json = await this.request;

      if(this.json.error) {
        const cause = this.json.error.root_cause[0];
        switch(cause.type) {
          case "index_not_found_exception":
            this.index.exists = false;
            break;
        }
      } else {
        this.index.exists = true;
      }
    },
    async createIndex() {
      await this.elasticsearch('', {
        method: "PUT"
      });
      await this.checkIndex();
    },
    async dropIndex() {
      await this.elasticsearch('', {
        method: "DELETE"
      });
      await this.checkIndex();
    }
  }
}
</script>
