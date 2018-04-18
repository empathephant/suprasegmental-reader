<template>
  <div>
    <div id="hero">
        <h1>Teacher Dashboard</h1>
     </div>

    <div id="container">
      <p>Welcome to Suprasegmental Reader! Get started by adding a new passage for students to read or by browsing the passages already in our system.</p>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'TeacherDashboard',
   components: {},
   computed: {
   },
 }
</script>

<style scoped>
.hero {
     text-align: center;
 }
 h1 {
     font-size: 2.5em;
     letter-spacing: .2rem;
     color: #999;
     margin-bottom: 2px;
     text-align: center;
 }
 #container {
    max-width: 800px;
    margin: auto;
    padding: 1em;
}
</style>