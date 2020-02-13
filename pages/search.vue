<template>
  <div>
    <div class="ui container">
      <div class="ui three column grid centered">
        <div class="column">
          <div class="row">
            <div class="ui left icon right action huge input">
              <input type="text" placeholder="Search..." @keypress.enter="search" v-model="searchTerm"></input>
              <i class="search link icon" @click="search"></i>
              <button class="ui basic floating button" @click="search">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div class="ui grid">
        <div class="column">
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: "",
    };
  },
  methods: {
    search() {
      this.$router.push(`/search/${this.searchTerm}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.ui.basic.floating.button {
  background-color: white;
}
</style>
