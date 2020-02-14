<template>
  <div></div>
</template>

<script>
export default {
  props: {
    value: Object,
    mode: {
      type: String,
      default: "code"
    },
    live:{
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.editor = new JSONEditor(this.$el, {
      mode: this.mode,
      onChangeText: (text) => {
        let json = null;

        try {
          json = JSON.parse(text);
        } catch {
          // do nothing.
        }

        if(json) {
          this.$emit("input", json);
        }
      }
    });
    this.editor.set(this.value);
  },
  watch: {
    value: function(value) {
      if(this.live) {
        this.editor.set(this.value);
      }
    }
  }
}
</script>
