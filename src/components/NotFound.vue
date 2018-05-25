<template>
    <div>
        <div class="hero">
            <h1>404</h1>
            <h2>The page you were looking for isn't here.</h2>
            <img v-bind:src="imagePath"/>
        </div>
        <div id="container">
            <p>Try going back to <router-link to="/landing">the home page.</router-link></p>   
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Landing',
        data () {
            return {
            }
        },

        methods: {
            
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