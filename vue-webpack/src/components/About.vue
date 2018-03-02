<template>
    <div>
        <div id="hero">
            <h1>About</h1>
        </div>

        <div id="container">
            <p>Suprasegmental Reader is a project developed by Shanti der Blätter as part of a research study under the direction of Dr. Mark Tanner, Department of Linguistics and English Language at Brigham Young University.</p>

            <div id="about-pics">
                <div class="pic-with-cap">
                    <div class="picture" style="background-image: url('./static/images/tanner.jpg')"></div>
                    <p class="caption">Dr. Mark Tanner</p>
                </div>
    
                <div class="pic-with-cap">
                    <div class="picture" style="background-image: url('./static/images/shanti.jpg')"></div>
                    <p class="caption">Shanti der Blätter</p>
                </div>
            </div>

            <p>Shanti is pursuing a bachelor's degree in linguistics with minors in computer science and TESOL (Teaching English to Speakers of Other Languages). This project particularly appealed to her as it combined her loves of language, teaching, and coding.</p>

            <p>The term "suprasegmental features" refers to the identified use of pausing, intonation, stressed syllables, and other features of spoken language on a more general scale than investigating isolated, individual phonemes. Research in TESOL and SLA (Second Language Acquisition) over the past 20 years has shown that the teaching of these features can more efficiently improve a nonnative speaker's comprehensibility than a focus on segmental features, or individual phonemes like /t/ or a short /a/ sound. This project has been designed to implement that research into an easy-to-use application that can be utilized in the classroom or for individual study. For more information on suprasegmentals or to see a list of works cited, you may <a href="mailto:empathephant@gmail.com">email the author</a>.</p>

            <p>The code for this site is <a href="https://github.com/empathephant/suprasegmental-reader">available on GitHub</a>. Please fork, star, and contribute!</p>
        </div>
    </div>
</template>

<script>
 export default {
     name: 'About'
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
     text-align: center;
     font-size: 2.5em;
     letter-spacing: .2rem;
     color: #999;
     margin-bottom: 2px;
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

.stretch {
    width: 100vw;
    height: 90vh;
}

 .picture {
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
}

 .pic-with-cap {
    text-align: center;
}

 .pic-with-cap .picture {
    width: 100%;
    max-height: 90vh;
    min-height: 22vh;
}

.caption {
    font-size: 0.8em;
    font-style: italic;
}

 #about-pics {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    align-content: space-around;
}

#about-pics .pic-with-cap {
    flex-grow: 1;
    flex-shrink: 1;
    height: 100%;
    max-width: 40%;
}
</style>