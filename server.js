// Set Up Express and Packages

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))


console.log('hi, I\'m your backend server!');

// Handle Users

let users = [
    {
        "id": 0,
        "date_joined": "Date.now()",
        "first_name": "Shanti",
        "last_name": "der Blatter",
        "user_type": "teacher"
    },
    {
        "id": 1,
        "date_joined": "Date.now()",
        "first_name": "Brandon",
        "last_name": "der Blatter",
        "user_type": "student"
    },
];

app.get('/api/users/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let usersMap = users.map(user => { return user.id; });
    let index = usersMap.indexOf(id);
    let user = users[index]
    res.send(user);
});

// Handle Passages

let passages = [];
let passage_id = 0;

app.get('/api/passages', (req, res) => {
    res.send(passages);
});

app.get('/api/passages/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let passagesMap = passages.map(passage => { return passage.id; });
    let index = passagesMap.indexOf(id);
    let passage = passages[index]
    res.send(passage);
});

app.put('/api/passages/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let passagesMap = passages.map(passage => { return passage.id; });
    let index = passagesMap.indexOf(id);
    let passage = passages[index];

    passage.date_created = req.body.date_created;
    passage.title = req.body.title;
    passage.display_text = req.body.display_text;
    passage.completed = req.body.completed;
    begin_date: req.body.begin_date;

    // handle drag and drop re-ordering
    if (req.body.orderChange) {
        let indexTarget = passagesMap.indexOf(req.body.orderTarget);
        passages.splice(index, 1);
        passages.splice(indexTarget, 0, passage);
    }
    res.send(passage);
});

app.post('/api/passages', (req, res) => {
    passage_id = passage_id + 1;
    let passage = { 
        id: passage_id, 
        dateCreated: Date.now(),
        title: req.body.title, 
        author: req.body.author, 
        display_text: req.body.display_text, 
        syllables: [],
        completed: req.body.completed 
    };
    if (passage.completed === "true") {
        passage.date_completed = Date.now();
    }
    passages.push(passage);
    res.send(passage);
});

app.delete('/api/passages/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = passages.map(passage => { return passage.id; }).indexOf(id);
    if (removeIndex === -1) {
        res.status(404).send("Sorry, that passage doesn't exist");
        return;
    }
    passages.splice(removeIndex, 1);
    res.sendStatus(200);
});

// Handle Vocabulary Words

let vocabulary = [];
let word_id = 0;

// Oxford API Info

let app_id = "1ecba526";
let app_key = "b799b025f677272024c4a14aa489a3b7";
let api_base_url = "https://od-api.oxforddictionaries.com/api/v1/entries/en/";

app.get('/api/vocabulary', (req, res) => {
    res.send(vocabulary);
});

// app.get('/api/vocabulary/:id', (req, res) => {
//     let id = parseInt(req.params.id);
//     let vocabularyMap = vocabulary.map(passage => { return passage.id; });
//     let index = vocabularyMap.indexOf(id);
//     let passage = vocabulary[index]
//     res.send(passage);
// });

// app.put('/api/vocabulary/:id', (req, res) => {
//     let id = parseInt(req.params.id);
//     let vocabularyMap = vocabulary.map(passage => { return passage.id; });
//     let index = vocabularyMap.indexOf(id);
//     let passage = vocabulary[index];

//     passage.date_created = req.body.date_created;
//     passage.title = req.body.title;
//     passage.display_text = req.body.display_text;
//     passage.completed = req.body.completed;
//     begin_date: req.body.begin_date;

//     // handle drag and drop re-ordering
//     if (req.body.orderChange) {
//         let indexTarget = vocabularyMap.indexOf(req.body.orderTarget);
//         vocabulary.splice(index, 1);
//         vocabulary.splice(indexTarget, 0, passage);
//     }
    
//     res.send(passage);
// });

app.post('/api/vocabulary', (req, res) => {
    word_id = word_id + 1;

    let headwordToSearch = req.body.headword;
    let apiURL = api_base_url + headwordToSearch
    let oxfordHeaders = {
        "Accept": "application/json",
        "app_id": app_id,
        "app_key": app_key,
    };

    fetch(apiURL, {headers: oxfordHeaders}).then(function(response) {
        return response.json();
    }).then(function(json) {
        let lexicalEntries = json.results[0].lexicalEntries;
        let wordDefinitions = [];
        lexicalEntries.forEach(function(lexicalEntry) {
            let entries = lexicalEntry.entries;
            entries.forEach(function(entry) {
                let senses = entry.senses;
                senses.forEach(function(sense){
                    let definitions = sense.definitions;
                    definitions.forEach(function(definition){
                        if(definition) {
                            wordDefinitions.push(definition);
                        }
                    });
                });
            });
        });

        let word = {
            word_id: word_id,
            dateAdded: Date.now(),
            headword: headwordToSearch,
            definitions: wordDefinitions,
        };
        console.log(word);
        vocabulary.push(word);
        res.send(word);
    }); 
});

app.delete('/api/vocabulary/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let removeIndex = vocabulary.map(word => { return word.id; }).indexOf(id);
    if (removeIndex === -1) {
        res.status(404).send("Sorry, that word doesn't exist");
        return;
    }
    vocabulary.splice(removeIndex, 1);
    res.sendStatus(200);
});

app.listen(3002, () => console.log('Server listening on port 3002!'))