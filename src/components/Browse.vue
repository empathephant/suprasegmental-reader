<template>
    <div v-if="loggedIn">
        <div id="hero">
            <h1>Browse Passages</h1>
        </div>

        <div id="container">
            <h2 class="passage_head">Current Passages</h2>
            <div v-if="in_progress_passages.length > 0">
                <div class="passage_card" v-for="passage in in_progress_passages">
                    <button v-on:click="openPassage" class="accordion">{{passage.title}}</button>
                    <div class="passage_text">
                        <p class="attribution">by {{passage.author}}</p>
                        <p>{{passage.display_text}}</p>
                        <button v-if="edit_permission" class="delete" v-on:click="deletePassage(passage)">Delete</button>
                        <button v-else class="complete" v-on:click="finishPassage(passage)">Done</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="no_passages">No current passages to display.</p>
            </div>

            <h2 class="passage_head">Up-Next Passages</h2>
            <div v-if="todo_passages.length > 0">
                <div class="passage_card" v-for="passage in todo_passages">
                    <button v-on:click="openPassage" class="accordion">{{passage.title}}</button>
                    <div class="passage_text">
                        <p class="attribution">by {{passage.author}}</p>
                        <p>{{passage.display_text}}</p>
                        <button v-if="edit_permission" class="delete" v-on:click="deletePassage(passage)">Delete</button>
                        <button v-else class="begin" v-on:click="startPassage(passage)">Start Reading</button>
                    </div>
                </div>
            </div>
            <div v-else>
                <p class="no_passages">No other passages to display.</p>
            </div>      
            
            <h2 class="passage_head">Completed Passages</h2>
            <div v-if="completed_passages.length > 0">
                <div class="passage_card" v-for="passage in completed_passages">
                    <button v-on:click="openPassage" class="accordion">{{passage.title}}</button>
                    <div class="passage_text">
                        <p class="attribution">by {{passage.author}}</p>
                        <p>{{passage.display_text}}</p>
                        <button v-if="edit_permission" class="delete" v-on:click="deletePassage(passage)">Delete</button>
                    </div>
                </div> 
            </div>
            <div v-else>
                <p class="no_passages">You haven't completed any passages!</p>
            </div>       
        </div>
    </div>
    <div v-else>
            <p>Sorry, you must be logged in to view this content.</p>
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
        current_user: function() {
              return this.$store.getters.current_user;
         },
         loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
         edit_permission: function() {
             return this.current_user.user_type === "teacher";
         },
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
        openPassage: function() {
            /* Toggle between adding and removing the "active" class, to highlight the button that controls the panel */
            event.target.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            let passage_text = event.target.nextElementSibling;
            if (passage_text.style.display === "block") {
                passage_text.style.display = "none";
            } else {
                passage_text.style.display = "block";
            }
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
.complete, .begin {
    border: .1em solid #22CC99;
    border-radius: .3em;
    font-size: .75em;
    padding: .5em;
    margin: .5em;
    outline: none;
    background-color: #22CC99;
    cursor: pointer;
}

.complete:focus, .begin:focus {
    border: .1em solid lightgrey;
}

.complete:hover, .begin:hover {
    background-color: rgb(31, 199, 149);
    border-color: rgb(31, 199, 149);
}
.passage_head {
    text-align: center;
}
.delete {
    color: red;
    background-color: white;
    border: .1em solid red;
    border-radius: .3em;
    font-size: .75em;
    padding: .5em;
    margin: .5em;
    outline: none;
    cursor: pointer;
}
.delete:hover {
    color: white;
    background-color: red;
}
.passage_card {
    /* background-color: rgb(21, 184, 135); */
}
 a:hover {
    color: rgb(21, 184, 135);
}

a { 
    color: #22CC99;
    text-decoration: none;
}
.attribution {
    font-style: italic;
}

/* Style the buttons that are used to open and close the accordion panel */
.accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 15px 20px;
    width: 100%;
    font-size: 1em;
    text-align: left;
    border: none;
    outline: none;
    transition: 0.4s;
    border-radius: 6px;
    margin-bottom: 6px;
}

/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
.active, {
    background-color: #22CC99;
    font-weight: bold;
}

.accordion:hover {
    background-color: #ccc;
}

/* Style the accordion panel. Note: hidden by default */
.passage_text {
    padding: 0 18px;
    background-color: white;
    display: none;
    overflow: hidden;
    padding-bottom: 10px;
}
</style>