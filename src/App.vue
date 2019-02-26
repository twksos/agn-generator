<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <AGN :score="4.0"/>
  </div>
</template>

<script>
import AGN from './components/AGN.vue'

export default {
  name: 'app',
  components: {
    AGN
  }
}
</script>

<style>
:root {
    --main-color: #13bf13;
    --border-color: #0c880c;
    --trans-color: rgba(19, 191, 19, 0.85);
}
</style>
