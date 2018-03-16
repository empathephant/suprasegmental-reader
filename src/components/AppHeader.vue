<template>
    <nav>
	<label for="show-menu" class="show-menu">Show Menu</label>
	<input type="checkbox" id="show-menu" role="button">
        <ul id="menu">
	    <li class="nav-item" id="user_type">{{ current_user.user_type }}</li>
	    <li class="nav-item"><router-link to="/">Home</router-link></li>
	    <li class="nav-item"><router-link to="/add">Add a Passage</router-link></li>
	    <li class="nav-item"><router-link to="/browse">Read a Passage</router-link></li>
	    <li class="nav-item"><router-link to="/about">About</router-link></li>
	    <li class="nav-item"><router-link to="/contact">Contact</router-link></li>
	    <li class="nav-item" id="user_name">{{ current_user.first_name }}</li>
	</ul>	
    </nav>
</template>

<script>
 export default {
    name: 'AppHeader',
    data () {
        return {
        }
    },
    // created: {

    // },
    computed: {
        current_user: function() {
            return this.$store.getters.current_user;
        },
    },
    // methods: {
        
    // }
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
 /*Hide checkbox*/
 input[type=checkbox]{
     display: none;
 }
 /*Show menu when invisible checkbox is checked*/
 input[type=checkbox]:checked ~ #menu{
     display: block;
 }
</style>