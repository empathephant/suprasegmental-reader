<template>
    <footer>
        <hr id="footer-rule">
        <p>Copyright © 2018 Shanti der Blätter. All rights reserved.</p>
        <p>The Github repository for this site may be found
            <a href="https://github.com/empathephant/suprasegmental-reader">here</a>.</p>
    </footer>
</template>

<script>
 export default {
     name: 'AppFooter'
 }
</script>

<style scoped>
    a:hover {
        color: rgb(21, 184, 135);
    }

    a { 
        color: #22CC99;
        text-decoration: none;
    }

    #footer-rule {
        display: block;
        height: 1px;
        border: 0;
        border-top: 1px solid #ccc;
        margin: 1em 0;
        padding: 0; 
        color: rgb(204, 204, 204);
        background-color: rgb(204, 204, 204);
    }
    
    footer {
        color: grey;
        text-align: center;
        padding: 1em;
    }
</style>