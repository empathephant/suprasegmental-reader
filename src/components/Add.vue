<template>
    <div v-if="loggedIn && user_type === 'teacher'">
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
    <div v-else>
            <p>Sorry, you must be logged in as a teacher to view this content.</p>
    </div>
</template>

<script>
 export default {
    name: 'Add',
    data () {
        return {
            addedTitle: '',
            addedText: '',
        }
    },
    
    computed: {
        author: function() {
            return this.current_user.first_name + " " + this.current_user.last_name;
        },
        permissionToAdd: function() {
            // deep property
            let permission = (this.current_user.user_type === "teacher");
            console.log(`permission = ${permission}`);
            return permission;
        },
        loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
        current_user: function() {
            let userNow = this.$store.getters.current_user
            console.log(`computing current user ${userNow.first_name}`)
            return userNow;
        },
        user_type: function() {
            let user_type = this.current_user.user_type
            console.log(`current user ${this.current_user.first_name} is a ${user_type}`)
            return user_type;
        },
    },

     methods: {
        addPassage: function() {
            console.log(`New Passage "${this.addedTitle}" added by ${this.current_user.first_name}.`)
            this.$store.dispatch('addPassage',{
                date_created: Date.now(),
                title: this.addedTitle,
                display_text: this.addedText, 
                syllables: [],
                completed: "false",
                author: this.author,
            });
            this.addedTitle = '';
            this.addedText = '';
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
    resize: none;
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