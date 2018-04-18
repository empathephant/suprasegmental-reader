<template>
    <div id="container">
        <!-- <img src="/static/images/red-bird.png"/> -->
        <!-- TODO: Add logo   -->
        <h1>suprasegmental reader</h1>
        <h2>improve your pausing, intonation, and stress</h2>
        <div v-if="loggedIn">
            <p id="switch" v-on:click="logout">Sign in to a different account</p>
        </div>
        <div v-else id="login">
            <h3 id="hero">Login</h3>
            <form id="userInfo" v-on:submit.prevent="login">
                <input class="wide" v-model="email" placeholder="Email">
                <input class="wide" type="password" v-model="password" placeholder="Password">
                <button class="alternate" type="submit" href="#">LOGIN</button>
            </form>
            <p id="alternate"><router-link to="/register">or, create an account</router-link></p>
            <p class="error">{{loginError}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            loggedIn: function() {
       return this.$store.getters.loggedIn;
     },
            loginError: function() {
            return this.$store.getters.loginError;
            },
        },
        methods: {
            login: function() {
                console.log("method login");
                this.$store.dispatch('login',{
                    email: this.email,
                    password: this.password,
                });
                this.email = '';
                this.password = '';
            },
            logout: function() {
       this.$store.dispatch('logout');
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

.error {
    /* color: red; */
}

#userInfo {
    margin: auto;
    width: 70%;
}

#login {
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
#alternate a, #switch {
    color: rgb(75, 7, 135);
    text-decoration: underline;
}
</style>