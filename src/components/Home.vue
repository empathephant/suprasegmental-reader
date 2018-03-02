<template>
    <div>
        <div class="hero">
            <h1>suprasegmental reader</h1>
            <h2>improve your pausing, intonation, and stress</h2>
            <img v-bind:src="imagePath"/>
        </div>
        <div id="container">
            <p>This application allows TESOL (Teaching English to Speakers of Other Languages) teachers to upload reading passages and allows students to view, listen to, mark-up, and record themselves reading aloud the passages.</p>   
            <p>The methods used in this application are based on empirical research regarding the importance of teaching suprasegmental features of language as part of pronunciation instruction. More information on the theory behind this application can be found <a href="./about.html">here</a>.</p>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'Home',
     data () {
        return {
            imagePath: '/static/images/reading.jpg'
        }
     }
 }
</script>

<style scoped>
 body {
     padding: 0px;
     margin: 0px;
 }
 .hero {
     text-align: center;
 }
 h1 {
     font-size: 3.5em;
     letter-spacing: .2rem;
     color: #22CC99;
     margin-bottom: 2px;
     text-align: center;
 }

 h2 {
    font-size: 1.75em;
    font-weight: 100;
}
#container {
    max-width: 800px;
    margin: auto;
    padding: 1em;
}
 img {
     width: 100%;
 }
 a:hover {
    color: rgb(21, 184, 135);
}

a { 
    color: #22CC99;
    text-decoration: none;
}
</style>