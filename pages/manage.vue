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
          <h2 class="ui index name header">Index: {{ WebToken.payload.data.id }}</h2>
        </div>
        <div class="ui segment" v-if="index.exists">
          <div class="ui two column stackable grid">
            <div class="column">
              <div class="ui statistic">
                <div class="value">
                  {{ index.status[WebToken.payload.data.id].settings.index.number_of_shards }}
                </div>
                <div class="label">
                  Shards
                </div>
              </div>
            </div>
            <div class="column">
              <div class="ui statistic">
                <div class="value">
                  {{ index.status[WebToken.payload.data.id].settings.index.number_of_replicas }}
                </div>
                <div class="label">
                  Replicas
                </div>
              </div>
            </div>
          </div>
          <div class="ui vertical divider">and</div>
        </div>
        <div class="ui segment">
          <div class="ui centered grid">
            <div class="row">
              <button class="ui button" @click="dropIndex" v-if="index.exists">Drop Index</button>
              <button class="ui button" @click="createIndex" v-else>Create Index</button>
            </div>
          </div>
        </div>
        <div class="ui segment" v-if="index.exists">
          <div class="row">
            <h2 class="ui record count header">Records: {{ index.records }}</h2>
          </div>
        </div>
        <div class="ui segment" v-for="record in records">
          {{ record._source }}
          <button class="ui red button" @click="deleteRecord(record)">Delete</button>
        </div>
      </div>
      </div>
    </template>
  </promised>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";
import { elasticsearch } from "~/assets/elasticsearch.js";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
  data() {
    return {
      WebToken,
      request: null,
      index: {
        exists: false,
        status: { },
        records: 0
      },
      records: [ ]
    }
  },
  async mounted() {
    await this.getRecords();
    await this.getRecordCount();
    await this.checkIndex();
  },
  methods: {
    async checkIndex() {
      this.request = elasticsearch('', {
        index: WebToken.payload.data.id
      });
      this.index.status = await this.request;

      if(this.index.status.error) {
        const cause = this.index.status.error.root_cause[0];
        switch(cause.type) {
          case "index_not_found_exception":
            this.index.exists = false;
            break;
        }
      } else {
        this.index.exists = true;
      }
    },
    async deleteRecord(record) {
      this.request = elasticsearch(`_doc/${record._id}`, {
        method: "DELETE",
        index: WebToken.payload.data.id
      });
      await this.request;
      await sleep(1000);
      await this.getRecords();
    },
    async getRecords(query={ match_all: { } }) {
      this.request = elasticsearch('_search', {
        method: "POST",
        index: WebToken.payload.data.id,
        body: { query }
      });
      this.records = (await this.request).hits.hits;
    },
    async getRecordCount() {
      this.request = elasticsearch('_count', {
        method: "GET",
        index: WebToken.payload.data.id
      });
      this.index.records = (await this.request).count;
    },
    async createIndex() {
      await elasticsearch('', {
        method: "PUT",
        index: WebToken.payload.data.id
      });
      await this.checkIndex();
    },
    async dropIndex() {
      await elasticsearch('', {
        method: "DELETE",
        index: WebToken.payload.data.id
      });
      await this.checkIndex();
    }
  }
}
</script>

<style lang="scss" scoped>
.index.name, .record.count {
  text-align: center;
}

.stackable.grid {
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

</style>
