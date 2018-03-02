<template>
    <div>
        <div id="hero">
            <h1>Add a Passage</h1>
        </div>
        <div id="container">
            <form id="add" action="https://formspree.io/empathephant@gmail.com" method="POST">
                <input type="text" name="title" placeholder="Title">
                <textarea type="text" name="passage" placeholder="Passage" cols="30" rows="10"></textarea>
                <button type="submit">Add Passage</button>
            </form>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'Add'
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