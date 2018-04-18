<template>
    <nav>
    <!-- Draw hamburger to hide and display menu on small screens -->
    <ul v-bind:class="{show_menu: menuVisible}" id="menu">
        <div v-bind:class="{hamburger_x: menuVisible}" id="hamburger" v-on:click="showMenu">
            <div class="hamburger_stripe" id="hamburger_top"></div>
            <div class="hamburger_stripe" id="hamburger_mid"></div>
            <div class="hamburger_stripe" id="hamburger_bottom"></div>
        </div>
        <div v-if="loggedIn">
            <!-- Case 1: User is a teacher -->
            <div v-if="user_type === 'teacher'" class="nav">
                <div id="home"><router-link to="/">Home</router-link></div>
                <div class="nav-item"><router-link to="/add">Add<span class="wrap"> a Passage</span></router-link></div>
                <div class="nav-item"><router-link to="/browse">Browse<span class="wrap"> Passages</span></router-link></div>
                <div class="user_info">
                    <div class="nav-item user_name teacher">{{ current_user.first_name}}<span class="wrap">{{" " + current_user.last_name}}</span></div>
                    <div class="nav-item user_type teacher">TEACHER</div>
                </div>
                <div class="nav-item user_type" id="logout" v-on:click="logout" href="#">LOGOUT</div>
            </div>
            <!-- Case 2: User is a student -->
            <div v-else-if="user_type === 'student'" class="nav">
                <div id="home"><router-link to="/">Home</router-link></div>
                <div class="nav-item"><router-link to="/browse">Read<span class="wrap"> a Passage</span></router-link></div>
                <div class="nav-item"><router-link to="/vocabulary"><span class="wrap">My </span>Words</router-link></div>
                <div class="user_info">
                    <div class="nav-item user_name student">{{ current_user.first_name}}<span class="wrap">{{" " + current_user.last_name}}</span></div>
                    <div class="nav-item user_type student">STUDENT</div>
                </div>
                <div class="nav-item user_type " id="logout" v-on:click="logout" href="#">LOGOUT</div>
            </div>
            <!-- Case 3: User is undefined -->
            <div v-else class="nav">
                <p class="error">Something went wrong.</p>
                <div class="nav-item user_type" id="logout" v-on:click="logout" href="#">LOGOUT</div>
            </div>
        </div>
        <!-- Case 4: No user is logged in -->
        <div v-else class="nav">
            <div id="home"><router-link to="/">Home</router-link></div>
            <div class="nav-item"><router-link to="/about">About</router-link></div>
	        <div class="nav-item"><router-link to="/contact">Contact</router-link></div>   
            <div class="nav-item user_type" id="login"><router-link to="/login">LOGIN</router-link></div>
        </div>
    </ul>	
    </nav>
</template>

<script>
 export default {
    name: 'AppHeader',
    data () {
        return {
            menuVisible: false,
        }
    },
    // created: {

    // },
    computed: {
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
        showMenu: function() {
            this.menuVisible = !this.menuVisible;
        },
        switchUser: function() {
            if (this.current_user.id === 1) {
                this.$store.dispatch('updateCurUser',{
                    id: 0,
                });
            } else {
                this.$store.dispatch('updateCurUser',{
                    id: 1,
                });
            }   
        },
        logout: function() {
       this.$store.dispatch('logout');
     },

    }
 }
</script>

<style scoped>
 /*Strip the ul of padding and list styling*/
 .nav {
     display: flex;
     height: 30px;
 }
 .error {
     color: red;
 }
 #menu {
    background-color: lightgrey;
    border-color: lightgrey;
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    width: 100%;
    list-style-type: none;
    height: 80px;
}


 /*Create a horizontal list with spacing*/
 li {
        background-color: lightgrey;
     margin-right: 1px;
 }
 /*Style for menu links*/
 .nav-item a, #home a {
     display:block;
     padding: 14px 16px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     color: rgb(40, 40, 40);
     text-decoration: none;
     border-bottom: 2px solid lightgrey;
 }
 .nav-item a:visited, #home a:visited{
    color: rgb(40, 40, 40);
    text-decoration: none;
}

.user_type, .user_name {
     padding-left: 16px;
     padding-right: 16px;
     height: 25px;
     text-align: right;
     line-height: 25px;
     background-color: #22CC99;
     text-decoration: none;
     border-bottom: 3px solid #22CC99;
     margin: 0px;
     color: white;
 }
 .user_info {
     position: absolute;
     right: 0px;
     display: felex;
 }
.user_name {
     font-weight: bold;
    padding-top: 8px;
    padding-bottom: 4px;
}
.user_type {
    padding-top: 4px;
    padding-bottom: 8px;
} 
 .teacher {
     color: white;
     border-bottom: 3px solid rgb(75, 7, 135);
     background-color: rgb(75, 7, 135);
 }
 
 /*Active color*/
 .nav-item a.active, #home a.active {
 }
 /*Hover state for top level links*/
 .nav-item:hover a, #home:hover a {
     border-bottom: 2px solid #22CC99;
     color: black;
 }

 #login, #logout {
     height: 50px;
     line-height: 50px;
     padding: 13.5px 16px;
     color: white;
 }

 /* Create animated hamburger */

#hamburger {
    display: none;
    cursor: pointer;
    margin-right: 10px;
    margin-top: 10px;
}
.hamburger_stripe {
    width: 50px;
    height: 5px;
    background-color: rgb(31, 199, 149);
    margin: 8px 3px;;
    border-radius: 4px;
    transition: 0.4s;
    padding: 2px;
}
/* Rotate first bar */
.hamburger_x #hamburger_top {
    transform: rotate(-45deg) translate(-19px, 13px) ;
}

/* Fade out the second bar */
.hamburger_x #hamburger_mid {
    opacity: 0;
}

/* Rotate last bar */
.hamburger_x #hamburger_bottom {
    transform: rotate(45deg) translate(-9px, -7px) ;
}

 /* When the screen is less than 930 pixels wide*/
@media (max-width: 930px) {
    #user_type {
        display: none;
    }
    .wrap {
        display: none;
    }
}
 /* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media (max-width: 600px) {
    .nav-item {
        display: none;
    }
    #hamburger {
        position: fixed;
        right: 5px;
        display: inline;
    }  
     #menu {
         display: block;
     }
    .user_name {
        display: block;
        width: 100vw;
    }
}
/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
.show_menu {
    display: block;
}
.show_menu .nav-item {
    display: block;
}
</style>