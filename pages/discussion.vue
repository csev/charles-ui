<template>
  <div class="ui container">
    <div class="ui segment">
      <div class="ui grid centered">
        <div class="row">
          <h2 class="ui icon header">
            <i class="circular chat icon"></i>
            <div class="content">
              Realtime Discussion
              <div class="sub header">Join or create realtime discussions below.</div>
            </div>
          </h2>
        </div>
      </div>
    </div>
    <div class="ui segment">
      <div class="ui grid centered">
        <div class="row">
          <h2>New Discussion</h2>
        </div>
      </div>
      <div class="row">
        <div class="ui fluid left icon input">
          <input type="text" placeholder="Topic" v-model="model.attributes.thread.topic">
          <i class="chat icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="ui fluid left corner labeled input">
          <div class="ui left corner label">
              <i class="asterisk icon"></i>
          </div>
          <textarea placeholder="Description" v-model="model.attributes.thread.description"></textarea>
        </div>
      </div>
      <div class="ui grid centered">
        <div class="row">
          <button class="ui button" @click="createTopic">Create</button>
        </div>
      </div>
    </div>
    <discussion :model="model" :key="model.id" v-for="model in collection.models" />
  </div>
</template>

<script>
import { FIRE_API } from "~/assets/settings.js";
import WebToken from "~/assets/sugar-data/webtoken.js";
import { Model } from "~/assets/sugar-data/model.js";
import { Collection } from "~/assets/sugar-data/collection.js";

import discussion from "~/components/discussion.vue";

export default {
  components: {
    discussion
  },
  data() {
    return {
      model: new Model({
        host: FIRE_API,
        uri: "v1",
        type: "discussions",
        attributes: {
          thread: { }
        }
      }),
      collection: new Collection({
        host: FIRE_API,
        uri: "v1",
        type: "discussions",
        realtime: true
      })
    }
  },
  created() {
    this.getTopics();
  },
  methods: {
    async getTopics() {
      await this.collection.find();
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
    },
    async createTopic() {
      this.model.attributes.thread.created = Date.now();
      await this.model.save();
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
          title: "Discussion Created",
          detail: [ `Discussion topic ${this.model.attributes.thread.topic} created.` ],
          timeout: 5
        });
        this.model.empty();
        await this.getTopics();
      }
    },
    async addComment(model) {
      const newComment = {
        user: WebToken.payload.data.id,
        text: model.comment,
        created: Date.now()
      };
      delete model.comment;
      model.attributes.comments.push(newComment);
      await this.saveModel(model);
    },
    async addNestedComment(model, comment) {
      const newComment = {
        user: WebToken.payload.data.id,
        text: model.nestedComment,
        created: Date.now()
      };
      delete model.nestedComment;
      comment.comments.push(newComment);
      await this.saveModel(model);
    },
    async saveModel(model) {
      await model.save();
      if(model.errored) {
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

<style lang="scss" scoped>
.ui.input textarea {
  min-width: 100%;
}

.ui.segment .row {
  margin: 10px 0px 10px 0px;
}

.toggle {
  float:right;
}
</style>
