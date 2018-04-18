<template>
    <div>
        <div class="hero">
            <h1>suprasegmental reader</h1>
            <h2>improve your pausing, intonation, and stress</h2>
            <img v-bind:src="imagePath"/>
        </div>
        <div id="container">
            <p>This application allows TESOL (Teaching English to Speakers of Other Languages) teachers to upload reading passages and allows students to view, listen to, mark-up, and record themselves reading aloud the passages.</p>   
            <div id="user_select">
                <router-link to="/register"><button id="student_button">STUDENTS</button></router-link>
                <router-link to="/register"><button id="teacher_button">TEACHERS</button></router-link>
            </div>
            <p>The methods used in this application are based on empirical research regarding the importance of teaching suprasegmental features of language as part of pronunciation instruction. More information on the theory behind this application can be found <a href="./about.html">here</a>.</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Landing',
        data () {
            return {
                imagePath: '/static/images/reading.jpg'
            }
        },

        methods: {
            switchToStudent: function () {
                this.$store.dispatch('updateCurUser',{
                    id: 1,
                });
            },
            switchToTeacher: function () {
                this.$store.dispatch('updateCurUser',{
                    id: 0,
                });
            },
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
#user_select {
    display: flex;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: space-around;
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

button {
    border: .1em solid #22CC99;
    /* border-radius: .3em; */
    font-size: inherit;
    padding: 1em;
    margin: .5em;
    outline: none;
    background-color: #22CC99;
    cursor: pointer;
    color: white;
}

button:focus {
    border: .1em solid lightgrey;
}

button:hover {
    background-color: rgb(31, 199, 149);
    border-color: rgb(31, 199, 149);
}
@media (max-width: 600px) {
    .hero h1 {
        font-size: 2.2em;
        padding-top: 25px;
    }
    .hero h2 {
        font-size: 1.5em;
    }
}
</style>