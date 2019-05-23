<template>
  <div id="app">
    <AGN :score="6.8" background-image="/ac10036041.png"/>
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

body {
    background-color: #fff;
    color: #333435;
    font-size: 14px;
    line-height: 1.643;
}
</style>
