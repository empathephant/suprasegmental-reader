<template>
  <div id="app">
    <app-header></app-header>
    <div id="content">
      <router-view/>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  name: 'App',
  components: { AppHeader, AppFooter }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0;
  font-size: 1.2em;
}
#content {
  margin-top: 60px;
}
</style>
