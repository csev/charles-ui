<template>
  <div id="root">
    <button class="ui purple icon button" @click="toggleMenu"><i class="bars icon"></i>Menu</button>
    <message class="ui container" />
    <div class="ui left vertical inverted sidebar labeled icon menu">
      <nuxt-link class="item" :to="{ name: 'index' }"><i class="home icon"></i>Fire UI</nuxt-link>
      <nuxt-link class="item" :to="{ name: 'account' }"><i class="block layout icon"></i>Account</nuxt-link>
    </div>
    <nuxt />
  </div>
</template>

<script>
import message from "~/components/message.vue";

export default {
  methods: {
    toggleMenu() {
      $('.ui.vertical.sidebar').sidebar('toggle');
    }
  },
  components: {
    message
  }
}
</script>

<style lang="scss">
  /*html, body, #root {
    min-height: 100%;
    background: fixed linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.9)), center fixed url("/background.jpg");
  }*/
</style>
