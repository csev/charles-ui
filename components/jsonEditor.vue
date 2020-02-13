<template>
  <div></div>
</template>

<script>
export default {
  props: ["value"],
  mounted() {
    this.editor = new JSONEditor(this.$el, {
      mode: "code",
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
  }
}
</script>
