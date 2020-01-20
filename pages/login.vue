<template>
  <div class="ui container">
    <div class="ui two column grid centered">
      <div class="row">
        <h1>Login</h1>
      </div>
      <div class="row">
        <div class="ui left icon input">
          <input type="text" placeholder="Username">
          <i class="user icon"></i>
        </div>
      </div>
      <div class="row">
        <div class="ui left icon input">
          <input type="password" placeholder="Password">
          <i class="shield icon"></i>
        </div>
      </div>
      <div class="row">
        <button class="ui primary button">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
