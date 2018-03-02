<template>
    <div>
        <div class="hero">
            <h1>Contact Us</h1>
        </div>
        <div id="container">
            <form id="contact" action="https://formspree.io/empathephant@gmail.com" method="POST">
                    <input type="text" name="name" placeholder="Name">
                    <input type="email" name="_replyto" placeholder="Email">
                    <textarea type="text" name="message" placeholder="Message" cols="30" rows="10"></textarea>
                    <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'Contact'
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

 #contact {
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