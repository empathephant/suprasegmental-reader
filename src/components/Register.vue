<template>
    <div id="container">
        <!-- <img src="/static/images/red-bird.png"/> -->
        <!-- TODO: Add logo   -->
        <h1>suprasegmental reader</h1>
        <h2>improve your pausing, intonation, and stress</h2>
        <div id="createAccount">
            <h3 id="hero">Create an Account</h3>
            <form id="registration" v-on:submit.prevent="register">
                <div class="doubleWide">
                    <input class="narrow" v-model="first_name" placeholder="First Name"><br/>
                    <input class="narrow" v-model="last_name" placeholder="Last Name"><br/>
                </div>
                <div class="doubleWide">
                    <input type="radio" v-model="user_type" value="student" checked>
                    <p class="radio"> Student</p>
                    <input type="radio" v-model="user_type" value="teacher">
                    <p class="radio"> Teacher</p>
                </div>
                <div v-if="isStudent">
                    <input class="narrow" v-model="class_id" placeholder="Classroom ID Number">
                </div>
                <input class="wide" v-model="email" placeholder="Email Address">
                <input class="wide" v-model="username" placeholder="Username">
                <input class="wide" type="password" v-model="password" placeholder="Password">
                <button class="alternate" type="submit">REGISTER</button>
            </form>
            <p id="alternate"><router-link to="/login">I already have an account</router-link></p>
            <p class="error">{{registerError}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Register',
        data () {
            return {
            username: '',
            email: '',
            password: '',
            first_name: '',
            last_name: '',
            user_type: 'student',
            class_id: '',
            }
        },
        computed: {
            registerError: function() {
            return this.$store.getters.registerError;
            },
            isStudent: function () {
                return this.user_type === 'student';
            }
        },
        methods: {
            register: function() {
                console.log("method register");
                this.$store.dispatch('register',{
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    first_name: this.first_name,
                    last_name: this.last_name,
                    user_type: this.user_type,
                    class_id: this.class_id,
                });
                this.username = '';
                this.email = '';
                this.password = '';
                this.first_name = '';
                this.last_name = '';
                this.user_type = 'student';
                this.class_id = '';
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    img {
        width: 100px;
    }

    h2 {
        margin-top: 0px;
        font-size: 1.2em;
        font-weight: normal;
        margin-bottom: 50px;
     text-align: center;
    }
    .narrow {
        width: 45%;
        flex-grow: 1;
    }
    .wide {
        width: 100%;
    }
    body {
     padding: 0px;
     margin: 0px;
 }
 #hero {
     text-align: center;
     color: white;
          font-size: 1.75em;

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



#registration {
    margin: auto;
    width: 70%;
}

#createAccount {
    background-color: #22CC99;
    padding: 15px;
    border-radius: 15px;
}

input,
textarea {
    border-radius: .3em;
    font-size: inherit;
    padding: .5em;
    margin: .5em;
    outline: none;
    resize: none;
    border: .1em solid #22CC99;
}

input:focus,
textarea:focus {
    border: .1em solid lightgrey;
}

button {
    border: .1em solid rgb(75, 7, 135);
    border-radius: .3em;
    font-size: inherit;
    padding: .5em;
    margin: .5em;
    outline: none;
    background-color: rgb(75, 7, 135);
    cursor: pointer;
    color: white;
    display: block;
    width: 100%

}

button:focus {
    border: .1em solid lightgrey;
}

button:hover {
    background-color: rgb(95, 8, 172);
    border-color: rgb(95, 8, 172);
}

.radio {
    color: white;
    font-size: 1.1em;
    font-weight: bold;
}
.doubleWide {
    display: flex;
    justify-content: space-around;
}
#alternate a {
    color: rgb(75, 7, 135);
    text-decoration: underline;
}
</style>