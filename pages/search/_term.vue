<template>
  <div>
    <div class="ui segment" v-for="record in records">
      {{ record._source }}
    </div>
  </div>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";
import { elasticsearch } from "~/assets/elasticsearch.js";

export default {
  data() {
    return {
      records: [ ]
    };
  },
  async mounted() {
    let value = null;
    try {
      value = JSON.parse(this.$route.params.term);
    } catch {
      return null;
    }
    await this.getRecords({ term: value });
  },
  methods: {
    async getRecords(query) {
      this.request = elasticsearch('_search', {
        method: "POST",
        index: WebToken.payload.data.id,
        body: { query }
      });
      this.records = (await this.request).hits.hits;
    }
  },
  watch: {
    "$route.params.term": async function(value) {
      try {
        value = JSON.parse(value)
      } catch {
        return null;
      }
      await this.getRecords({ term: value });
    }
  }
}
</script>
