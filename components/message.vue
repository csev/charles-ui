<template>
  <div class="row">
    <!--button class="ui basic button" v-if="$store.state.message.list.length" v-on:click="closeAll()"><i class="close icon"></i>Close All</button-->
    <div class="ui message" v-bind:class="message.class" v-for="message in $store.state.message.list">
      <i class="close icon" v-on:click="close(message)"></i>
      <div class="header">{{ message.title }}</div>
      <ul class="list" v-for="detail in message.detail">
        <li>{{ detail }}</li>
      </ul>
    </div>
    <!--button class="ui button" @click="test">Test</button-->
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: null
    };
  },
  methods: {
    test() {
      this.$store.commit('message/add', {
        class: "error",
        title: "Test",
        detail: [ "test" ],
        timeout: 5
      });
    },
    closeAll() {
      for(let message of this.$store.state.message.list) {
        this.$store.commit('message/remove', message);
      }
    },
    close(message) {
      this.$store.commit('message/remove', message);
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.$store.commit('message/expire');
    }, 1000)
  },
  destroyed() {
    clearInterval(this.interval);
  }
}
</script>

<style lang="scss" scoped>
.close-all {

}
</style>
