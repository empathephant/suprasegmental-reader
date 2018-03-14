<template>
    <div>
        <div id="hero">
            <h1>Read a Passage</h1>
        </div>

        <div id="container">
            <h2 class="passage_head">Current Passages</h2>
            <div v-for="passage in passages">
                <hr>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>

            <h2 class="passage_head">Up-Next Passages</h2>
            <div v-for="passage in passages">
                <hr>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>            
            
            <h2 class="passage_head">Completed Passages</h2>
            <div v-for="passage in passages">
                <hr>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>        
        </div>
    </div>
</template>

<script>
import axios from 'axios';
 export default {
     name: 'Read',
     data () {
        return {
            passages: [],
        }
     },
     created: function() {
        this.getPassages();
     },
     methods: {
        getPassages: function() {
            axios.get("/api/passages").then(response => {
	            this.passages = response.data;
	            return true;
            }).catch(err => {
            });
        },
     },
 }
</script>

<style scoped>
 body {
     padding: 0px;
     margin: 0px;
     text-align: left;
 }
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
.passage_head {
    text-align: center;
}
 a:hover {
    color: rgb(21, 184, 135);
}

a { 
    color: #22CC99;
    text-decoration: none;
}
</style>