<template>
    <div>
        <div id="hero">
            <h1>Browse Passages</h1>
        </div>

        <div id="container">
            <h2 class="passage_head">Current Passages</h2>
            <div v-for="passage in in_progress_passages">
                <hr>
                <button class="delete" v-on:click="deletePassage(passage)">Delete</button>
                <button class="complete" v-on:click="finishPassage(passage)">I'm Finished Reading</button>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>

            <h2 class="passage_head">Up-Next Passages</h2>
            <div v-for="passage in todo_passages">
                <hr>
                <button class="delete" v-on:click="deletePassage(passage)">Delete</button>
                <button class="begin" v-on:click="startPassage(passage)">Read</button>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>            
            
            <h2 class="passage_head">Completed Passages</h2>
            <div v-for="passage in completed_passages">
                <hr>
                <button class="delete" v-on:click="deletePassage(passage)">Delete</button>
                <h4>{{passage.title}}</h4>
                <p>{{passage.display_text}}</p>
	        </div>        
        </div>
    </div>
</template>

<script>
 export default {
     name: 'Browse',
     data () {
        return {
          
        }
     },
     created: function() {
        this.getPassages();
     },
    computed: {
        passages: function() {
            return this.$store.getters.passages;
        },
        in_progress_passages: function() {
            let inprogress = this.passages.filter(function(passage) {
                return passage.completed === "in_progress";
            });
            console.log(`number in progress passages: ${inprogress.length}`);
            return inprogress;
        },
        completed_passages: function() {
            let completed = this.passages.filter(function(passage) {
                return passage.completed === "true";
            });
            console.log(`number completed passages: ${completed.length}`);
            return completed;
        },
        todo_passages: function() {
            let todo = this.passages.filter(function(passage) {
                return passage.completed === "false";
            });
            console.log(`number todo passages: ${todo.length}`);
            return todo;
        },
    },
     methods: {
        getPassages: function() {
            console.log(`get passages method`)
            this.$store.dispatch('getPassages');
        },
        deletePassage: function(passage) {
            console.log(`delete passage method on ${passage.title}`)
            this.$store.dispatch('deletePassage',{
                id: passage.id
            });
            this.getPassages();
        },
        startPassage: function(passage) {
            console.log(`start passage method on ${passage.title}`)
            this.$store.dispatch('updatePassage',{
                id: passage.id,
                date_created: passage.date_created,
                title: passage.title,
                display_text: passage.display_text,
                completed: "in_progress",
                begin_date: Date.now(),
            });
            this.getPassages();
        },
        finishPassage: function(passage) {
            console.log(`finish passage method on ${passage.title}`)
            this.$store.dispatch('updatePassage',{
                id: passage.id,
                date_created: passage.date_created,
                title: passage.title,
                display_text: passage.display_text,
                completed: "true",
                completion_date: Date.now(),
            });
            this.getPassages();
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