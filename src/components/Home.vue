<template>
  <div>
    <div v-if="loggedIn">
      <student-dashboard/>
    </div>
    <div v-else>
      <landing/>
    </div>
  </div>
</template>

<script>
 import Landing from './Landing';
 import StudentDashboard from './StudentDashboard';
 export default {
   name: 'HomePage',
   components: {Landing, StudentDashboard},
   computed: {
     loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
   },
 }
</script>

<style scoped>
</style>