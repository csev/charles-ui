<template>
  <div>
    <a :class="{ editing }" @click="editing = !editing">
      <i class="comment alternate icon"></i>
      <text-highlight class="ui blue text" :queries="highlight">{{ comment.text }}</text-highlight>
      <div class="description">{{ comment.created | timestamp }}</div>
      <div class="ui fluid right action input">
        <input type="text" v-model="newComment" @click.stop @keypress.enter="addComment"></input>
        <button class="ui button" @click="addComment">Comment</button>
      </div>
    </a>
    <slot></slot>
  </div>
</template>

<script>
import WebToken from "~/assets/sugar-data/webtoken.js";

export default {
  props: {
    comment: Object,
    model: Object,
    highlight: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      newComment: "",
      editing: false
    };
  },
  methods: {
    async addComment() {
      const comment = {
        user: WebToken.payload.data.id,
        text: this.newComment,
        created: Date.now()
      };
      this.comment.comments.push(comment);
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
        this.editing = false;
        this.newComment = "";
      }
    }
  }
}
</script>

<style lang="scss" scoped>
a.editing div.comment {
  color: red;
}

a div.ui.fluid.right.action.input {
  visibility: hidden;
  height: 0;
}

a.editing div.ui.fluid.right.action.input {
  visibility: visible;
  height: 100%;
}
</style>
