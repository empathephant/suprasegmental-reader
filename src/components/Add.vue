<template>
    <div>
        <div id="hero">
            <h1>Add a Passage</h1>
        </div>
        <div id="container">
            <form id="add" v-on:submit.prevent="addPassage">
                <input v-model="addedTitle" type="text" name="title" placeholder="Title">
                <textarea v-model="addedText" type="text" name="passage" placeholder="Passage" cols="30" rows="10"></textarea>
                <button type="submit">Add Passage</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
 export default {
     name: 'Add',
     data () {
         return {
             addedTitle: '',
             addedText: '',
         }
     },
     methods: {
        addPassage: function() {
            console.log(`New Passage "${this.addedTitle}" added.`)
            axios.post("/api/passages", {
                date_created: Date.now(),
                title: this.addedTitle,
                display_text: this.addedText, 
                syllables: [],
                completed: "false",
            }).then(response => {
                this.addedTitle = "";
                this.addedText = "";
                return true;
            }).catch(err => {
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
 a:hover {
    color: rgb(21, 184, 135);
}

a { 
    color: #22CC99;
    text-decoration: none;
}

#add {
    display: flex;
    flex-direction: column;
    align-items: stretch;
}

input,
textarea {
    border: .1em solid lightgrey;
    border-radius: .3em;
    font-size: inherit;
    padding: .5em;
    margin: .5em;
    outline: none;
}

input:focus,
textarea:focus {
    border: .1em solid #22CC99;
}

button {
    border: .1em solid #22CC99;
    border-radius: .3em;
    font-size: inherit;
    padding: .5em;
    margin: .5em;
    outline: none;
}

button:focus {
    border: .1em solid lightgrey;
}

button {
    background-color: #22CC99;
    cursor: pointer;
}

button:hover {
    background-color: rgb(31, 199, 149);
    border-color: rgb(31, 199, 149);
}

</style>