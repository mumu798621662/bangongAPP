<template>
  <div id="app">
    <!--<div>-->
    <!--<img src="./assets/logo.png">-->
    <!--</div>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  *{
    padding: 0;
    margin: 0;
  }
  body{
    width: 100%;
    height: 100%;
    overflow: hidden;

  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  /*height: 100%;*/
}
</style>
