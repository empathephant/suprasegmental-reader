<template>
    <div>
        <div id="hero">
            <h1>My Vocabulary List</h1>
        </div>
        <div id="container">
            <form id="dictSearch" v-on:submit.prevent="dictSearch">
                <input v-model="headwordToSearch" type="text" name="headword" placeholder="Word">
                <button type="submit">Search<span class="wrap"> Dictionary</span></button>
            </form>
        </div>
    </div>
</template>

<script>
 export default {
    name: 'Vocab',
    data () {
        return {
            headwordToSearch: '',
        }
    },
    
    computed: {
        current_user: function() {
                return this.$store.getters.current_user;
        },
    },

    methods: {
        dictSearch: function() {
            console.log(`${this.current_user.first_name} is searching dictionary for "${this.headwordToSearch}".`)
            this.$store.dispatch('addVocabWord',{
                headword: this.headwordToSearch,
            });
            this.headwordToSearch = '';
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

    #dictSearch {
        display: flex;
        justify-content: center;
        padding: 36px;
    }

    a:hover {
        color: rgb(21, 184, 135);
    }

    a { 
        color: #22CC99;
        text-decoration: none;
    }
    input {
        border: .1em solid lightgrey;
        border-radius: .3em;
        font-size: inherit;
        padding: .5em;
        margin: .5em;
        outline: none;
        resize: none;
    }

    input:focus {
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

    @media (max-width: 930px) {
        .wrap {
            display: none;
        }
    }
</style>