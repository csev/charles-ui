<template>
  <div class="ui very padded segment">
    <a class="title row" :class="{ editing }" @click="editing = !editing">
      <div class="ui header">
        <text-highlight :queries="highlight">{{ model.attributes.thread.topic }}</text-highlight>
      </div>
      <div class="ui text">
        <text-highlight :queries="highlight">{{ model.attributes.thread.description }}</text-highlight>
      </div>
      <div class="created">
        {{ model.attributes.thread.created | timestamp }}
      </div>
    </a>
    <div class="row" v-if="editing">
      <div class="ui fluid right action input">
        <input type="text" v-model="newComment" @keypress.enter="addComment()"></input>
        <button class="ui button" @click="addComment()">Comment</button>
      </div>
    </div>
    <comments :comments="model.attributes.comments" :model="model" :highlight="highlight" />
  </div>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";
import comments from "~/components/comments.vue";

export default {
  props: {
    model: Object,
    highlight: {
      type: String,
      default: ""
    }
  },
  components: {
    comments
  },
  methods: {
    async addComment() {
      const newComment = {
        user: WebToken.payload.data.id,
        text: this.newComment,
        created: Date.now()
      };
      this.model.attributes.comments.push(newComment);
      await this.model.save();
      if(this.model.errored) {
        for(let error of this.model.errored) {
          this.$store.commit("message/add", {
            class: "error",
            title: error.title,
            detail: [ error.detail ],
            timeout: 5
          });
        }
      } else {
        this.newComment = "";
        this.editing = false;
      }
    }
  },
  data() {
    return {
      WebToken,
      newComment: "",
      editing: false
    };
  }
}
</script>

<style lang="scss" scoped>
a.title {
  display: inline-block;
}

a.title:hover {
  cursor: pointer;
}

div.created {
  color: black;
}
</style>
