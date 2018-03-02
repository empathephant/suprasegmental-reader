<template>
    <div>
        <div id="hero">
            <h1>Read a Passage</h1>
        </div>

        <div id="container">
            <p>This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here. This is an example passage. Text for a passage will appear here.</p>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'Read',
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
 a:hover {
    color: rgb(21, 184, 135);
}

a { 
    color: #22CC99;
    text-decoration: none;
}
</style>