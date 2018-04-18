<template>
  <div>
    <div id="hero">
        <h1>Student Dashboard</h1>
     </div>

    <div id="container">
      <p>Welcome to Suprasegmental Reader! Get started by adding some words to study to your personal vocabulary list or practicing your reading and pronunciation skills with one of our passages.</p>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'StudentDashboard',
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