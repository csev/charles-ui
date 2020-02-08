<template>
  <div class="ui container">
    <discussion :highlight="trimmedTerm" :model="model" :key="model.id" v-for="model in collection.models" />
  </div>
</template>

<script>
import { FIRE_API } from "~/assets/settings.js";
import { Collection } from "~/assets/sugar-data/collection.js";

import discussion from "~/components/discussion.vue";

export default {
  components: {
    discussion
  },
  data() {
    return {
      collection: new Collection({
        host: FIRE_API,
        uri: "v1",
        type: "discussions",
        realtime: true
      })
    };
  },
  async created() {
    await this.search();
  },
  computed: {
    trimmedTerm() {
      return _.trim(this.$route.params.term, "\"");
    }
  },
  methods: {
    async search() {
      await this.collection.find({
        query: { $text: { $search: this.$route.params.term } }
      });
      if(this.collection.errored) {
        for(let error of this.collection.errors) {
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
