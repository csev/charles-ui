<template>
  <div class="ui list">
    <div class="item" v-for="comment in comments">
      <comment :comment="comment" :model="model" :highlight="highlight">
        <comments :comments="comment.comments" :model="model" :highlight="highlight"/>
      </comment>
    </div>
  </div>
</template>

<script>
import comment from "~/components/comment.vue";

export default {
  name: "comments",
  props: {
    comments: Array,
    model: Object,
    highlight: {
      type: String,
      default: ""
    }
  },
  components: {
    comment
  }
}
</script>
