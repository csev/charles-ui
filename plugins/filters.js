import Vue from "vue";

Vue.filter('timestamp', function(value) {
  return (new Date(value)).toUTCString();
});
