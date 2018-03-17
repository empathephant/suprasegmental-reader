<template>
    <nav>
	<label for="show-menu" class="show-menu">Show Menu</label>
	<input type="checkbox" id="show-menu" role="button">
    <ul id="menu">
	    <li class="nav-item"><router-link to="/">Home</router-link></li>
	    <li v-if="teacher_type" class="nav-item"><router-link to="/add">Add a Passage</router-link></li>
	    <li v-if="teacher_type" class="nav-item"><router-link to="/browse">Browse Passages</router-link></li>
	    <li v-else class="nav-item"><router-link to="/browse">Read a Passage</router-link></li>
	    <li class="nav-item"><router-link to="/about">About</router-link></li>
	    <li class="nav-item"><router-link to="/contact">Contact</router-link></li>
        <li class="nav-item" id="user_type" v-if="current_user.first_name === undefined">LOGIN</li>
	    <div v-else>
            <li class="nav-item" id="user_type">{{ teacher_type ? "TEACHER" : "STUDENT" }}</li>
	        <li class="nav-item" id="user_name">{{ current_user.first_name  + " " + current_user.last_name}}</li>
        </div>
        <div v-bind:class="{show_menu: menuVisible}" id="hamburger" v-on:click="showMenu">
            <div class="hamburger_stripe hamburger_top"></div>
            <div class="hamburger_stripe hamburger_mid"></div>
            <div class="hamburger_stripe hamburger_bottom"></div>
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
    }
 }
</script>

<style scoped>
 /*Strip the ul of padding and list styling*/
 .clear {
     float: clear;
 }
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
    overflow: hidden;
    position: fixed;
    top: 0;
    width: 100%;
    list-style-type: none;
}


 /*Create a horizontal list with spacing*/
 li {
     display: inline-block;
     float: left;
     margin-right: 1px;
 }
 /*Style for menu links*/
 .nav-item a {
     display:block;
     padding: 14px 16px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     color: rgb(40, 40, 40);
     text-decoration: none;
     border-bottom: 2px solid lightgrey;
 }
 .nav-item a:visited {
    color: rgb(40, 40, 40);
    text-decoration: none;
}

#user_type, #user_name {
     display:block;
     font-weight: bold;
     padding: 14px 16px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     background-color: #22CC99;
     text-decoration: none;
     border-bottom: 2px solid #22CC99;
     margin: 0px;
 }
 /*Active color*/
 .nav-item a.active {
 }
 /*Hover state for top level links*/
 .nav-item:hover a {
     border-bottom: 2px solid #22CC99;
     color: black;
 }
 /*Style 'show menu' label button and hide it by default*/
 .show-menu {
     text-decoration: none;
     color: #fff;
     background: #FF5035;
     text-align: center;
     padding: 10px 0;
     display: none;
 }

 /* Create animated hamburger */

#hamburger {
    display: none;
    cursor: pointer;
    margin-right: 1px;
}
.hamburger_stripe {
    width: 35px;
    height: 5px;
    background-color: black;
    margin: 6px 0;
    border-radius: 2px;
    transition: 0.4s;
}
/* Rotate first bar */
.show_menu .hamburger_top {
    transform: rotate(-45deg) translate(-9px, 6px) ;
}

/* Fade out the second bar */
.show_menu .hamburger_mid {
    opacity: 0;
}

/* Rotate last bar */
.show_menu .hamburger_bottom {
    transform: rotate(45deg) translate(-8px, -8px) ;
}

 /*Hide checkbox*/
 input[type=checkbox]{
     display: none;
 }
 /*Show menu when invisible checkbox is checked*/
 input[type=checkbox]:checked ~ #menu{
     display: block;
 }
 /* When the screen is less than 930 pixels wide*/
@media (max-width: 930px) {
    #user_type {
        display: none;
    }
}
 /* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media (max-width: 600px) {
    .nav-item {
        display: none;
    }
    #user_name {
        display: none;
    }
    #hamburger {
        position: fixed;
        right: 5px;
        display: block;
    }
}
</style>