console.log('hi, I\'m your backend server!');

// Set Up Express and Packages

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// jwt setup
const jwt = require('jsonwebtoken');
let jwtSecret = process.env.jwtSecret;
if (jwtSecret === undefined) {
    console.log("You need to define a jwtSecret environment variable to continue.");
    knex.destroy();
    process.exit();
}

// Handle Login

const verifyToken = (req, res, next) => {
    console.log('verifyToken')
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).send({ error: 'No token provided.' });
    jwt.verify(token, jwtSecret, function (err, decoded) {
        if (err)
            return res.status(500).send({ error: 'Failed to authenticate token.' });
        // if everything good, save to request for use in other routes
        req.user_id = decoded.id;
        next();
    });
}

app.post('/api/login', (req, res) => {
    console.log(`post login on ${req.body.email}`);
    console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).send();
        console.log("not enough info");
    }
    knex('users').where('email', req.body.email).first().then(user => {
        if (user === undefined) {
            console.log("no email in system");
            res.status(403).send("Invalid credentials");
            throw new Error('abort');
        }
        console.log("email in system");
        return [bcrypt.compare(req.body.password, user.hash), user];
    }).spread((result, user) => {
        if (result) {
            console.log("correct hash");
            let token = jwt.sign({ id: user.user_id }, jwtSecret, {
                expiresIn: 86400 // expires in 24 hours
            });
            let packet = {
                user: { 
                    username: user.username, 
                    first_name: user.first_name, 
                    last_name: user.last_name, 
                    user_type: user.user_type, 
                    user_id: user.user_id, 
                    email: user.email, 
                    date_joined: user.date_joined 
                }, 
                token: token 
            };
            console.log("responding with ");
            console.log(packet);
            res.status(200).json(packet);
        } else {
            console.log("bad pw");
            res.status(403).send("Invalid credentials");
        }
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

// Get my account
app.get('/api/me', verifyToken, (req, res) => {
    knex('users').where('user_id', req.user_id).first().select('username', 'first_name', 'last_name', 'id').then(user => {
        res.status(200).json({ user: user });
    }).catch(error => {
        res.status(500).json({ error });
    });
});

// Handle Users

let users = [
    // {
    //     "id": 0,
    //     "date_joined": "Date.now()",
    //     "first_name": "Shanti",
    //     "last_name": "der Blatter",
    //     "user_type": "teacher"
    // },
    // {
    //     "id": 1,
    //     "date_joined": "Date.now()",
    //     "first_name": "Brandon",
    //     "last_name": "der Blatter",
    //     "user_type": "student"
    // },
];

app.post('/api/users', (req, res) => {
    console.log(`posting ${req.body.username}`)
    if (!req.body.email || !req.body.password || !req.body.username || !req.body.first_name || !req.body.last_name || !req.body.user_type)
        return res.status(400).send();
    knex('users').where('email', req.body.email).first().then(user => {
        if (user !== undefined) {
            res.status(403).send("Email address already exists");
            throw new Error('abort');
        }
        return knex('users').where('username', req.body.username).first();
    }).then(user => {
        if (user !== undefined) {
            res.status(409).send("Username already exists");
            throw new Error('abort');
        }
        return bcrypt.hash(req.body.password, saltRounds);
    }).then(hash => {
        return knex('users').insert({
            email: req.body.email, 
            hash: hash, 
            username: req.body.username,
            first_name: req.body.first_name, 
            last_name: req.body.last_name, 
            user_type: req.body.user_type, 
            // date_joined: Date.now(),
        });
    }).then(ids => {
        return knex('users').where('user_id', ids[0]).first().select('username', 'first_name', 'last_name', 'user_id');
    }).then(user => {
        let token = jwt.sign({ id: user.id }, jwtSecret, {
            expiresIn: 86400 // expires in 24 hours
        });
        res.status(200).json({ user: user, token: token });
        return;
    }).catch(error => {
        if (error.message !== 'abort') {
            console.log(error);
            res.status(500).json({ error });
        }
    });
});

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

app.get('/api/users/:id/vocabulary', (req, res) => {
    let id = parseInt(req.params.id);
    knex('users').join('vocabulary', 'users.user_id', 'vocabulary.user_id')
        .where('users.user_id', id)
        .orderBy('date_added', 'desc')
        .select('headword', 'definitions', 'username', 'first_name', 'last_name', 'date_added').then(vocabulary => {
            let parsedVocabulary = vocabulary.map(function(word) {
                let newDefinitions = JSON.parse(word.definitions);
                console.log(newDefinitions);
                word.definitions = newDefinitions;
                return word;
            });
            res.status(200).json({ vocabulary: parsedVocabulary });
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
});

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
            date_added: Date.now(),
            headword: headwordToSearch,
            definitions: wordDefinitions,
        };
        console.log(word);
        vocabulary.push(word);
        res.send(word);
    }); 
});

app.post('/api/users/:id/vocabulary', verifyToken, (req, res) => {
    console.log('post /api/users/:id/vocabulary and this keyboard sucks');
    

    let headwordToSearch = req.body.headword;
    let apiURL = api_base_url + headwordToSearch
    let oxfordHeaders = {
        "Accept": "application/json",
        "app_id": app_id,
        "app_key": app_key,
    };

    fetch(apiURL, { headers: oxfordHeaders }).then(function (response) {
        return response.json();
    }).then(function (json) {
        let lexicalEntries = json.results[0].lexicalEntries;
        let wordDefinitions = [];
        lexicalEntries.forEach(function (lexicalEntry) {
            let entries = lexicalEntry.entries;
            entries.forEach(function (entry) {
                let senses = entry.senses;
                senses.forEach(function (sense) {
                    let definitions = sense.definitions;
                    definitions.forEach(function (definition) {
                        if (definition) {
                            wordDefinitions.push(definition);
                        }
                    });
                });
            });
        });

        let my_user_id = parseInt(req.params.id);
        console.log(`my_user_id = ${my_user_id} and req.user_id = ${req.user_id}`)
        if (my_user_id !== req.user_id) {
            res.status(403).send();
            return;
        }

        let my_word = {
            user_id: my_user_id,
            // date_added: Date.now(),
            headword: headwordToSearch,
            definitions: JSON.stringify(wordDefinitions),
        };

        knex('users').where('user_id', my_user_id).first().then(user => {
            return knex('vocabulary').insert(my_word);
        }).then(ids => {
            return knex('vocabulary').where('word_id', ids[0]).first();
        }).then(vocab_word => {
            res.status(200).json({ vocab_word: vocab_word });
            return;
        }).catch(error => {
            console.log(error);
            res.status(500).json({ error });
        });
    });
});

//TODO: We could do some additional error checking here, and return a 404 error if the user does not exist. Right now that will return a 500 error.

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