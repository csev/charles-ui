<template>
  <div class="ui two column grid centered">
    <h2 class="ui icon header">
      <i class="angle double down icon"></i>
    </h2>
    <div class="row">
      <h1>Activation</h1>
    </div>
    <div class="row">
      <div class="ui huge left icon input">
        <input v-model="model.attributes.key" type="text" placeholder="Key">
        <i class="globe icon"></i>
      </div>
    </div>
    <div v-if="!model.attributes.key" class="row">
      <button class="ui basic button">Resend</button>
      <button class="ui green button">Activate</button>
    </div>
    <div v-else class="row">
      {{ model.attributes.key }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    model: Object
  },
  methods: {
    async update() {
      await this.model.save();
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
