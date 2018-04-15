<template>
    <nav>
	<!-- <label for="show-menu" class="show-menu">Show Menu</label> -->
	<!-- <input type="checkbox" id="show-menu" role="button"> -->
    <ul v-bind:class="{show_menu: menuVisible}" id="menu">
        <div v-bind:class="{hamburger_x: menuVisible}" id="hamburger" v-on:click="showMenu">
            <div class="hamburger_stripe" id="hamburger_top"></div>
            <div class="hamburger_stripe" id="hamburger_mid"></div>
            <div class="hamburger_stripe" id="hamburger_bottom"></div>
        </div>
	    <li id="home"><router-link to="/">Home</router-link></li>
	    <li v-if="teacher_type" class="nav-item"><router-link to="/add">Add<span class="wrap"> a Passage</span></router-link></li>

	    <li v-if="teacher_type" class="nav-item"><router-link to="/browse">Browse<span class="wrap"> Passages</span></router-link></li>
	    <li v-else class="nav-item"><router-link to="/browse">Read<span class="wrap"> a Passage</span></router-link></li>
        <li v-if="!teacher_type" class="nav-item"><router-link to="/vocabulary"><span class="wrap">My </span>Word List</router-link></li>
	    <li class="nav-item"><router-link to="/about">About</router-link></li>
	    <li class="nav-item"><router-link to="/contact">Contact</router-link></li>


        <li class="nav-item user_type user_info" id="login" v-if="current_user.first_name === undefined" v-on:click="switchUser">LOGIN</li>
	    <div class="user_info" v-else>
	        <li class="nav-item user_name" v-bind:class="{teacher: teacher_type}" v-on:click="switchUser">{{ current_user.first_name}}<span class="wrap">{{" " + current_user.last_name}}</span></li>
            <li class="nav-item user_type" v-bind:class="{teacher: teacher_type}" v-on:click="switchUser">{{ teacher_type ? "TEACHER" : "STUDENT" }}</li>
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
        current_user: function() {
            return this.$store.getters.current_user;
        },
        teacher_type: function() {
            return this.current_user.user_type === "teacher";
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
    }
 }
</script>

<style scoped>
 /*Strip the ul of padding and list styling*/
 nav {
     display: grid;
     height: 30px;
 }
 #menu {
    background-color: lightgrey;
    border-color: lightgrey;
    display: flex;
    justify-content: center;
    list-style-type: none;
    margin: 0;
    padding: 0;
    /* overflow: hidden; */
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
 #login {
     height: 50px;
     line-height: 50px;
     padding: 13.5px 16px;
 }
 /*Active color*/
 .nav-item a.active, #home a.active {
 }
 /*Hover state for top level links*/
 .nav-item:hover a, #home:hover a {
     border-bottom: 2px solid #22CC99;
     color: black;
 }
 /* Style 'show menu' label button and hide it by default
 .show-menu {
     text-decoration: none;
     color: #fff;
     background: #FF5035;
     text-align: center;
     padding: 10px 0;
     display: none;
 } */

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
/* 
 Hide checkbox
 input[type=checkbox]{
     display: none;
 }
 Show menu when invisible checkbox is checked
 input[type=checkbox]:checked ~ #menu{
     display: block;
 } */
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
    /* #user_name {
        display: none;
    } */
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