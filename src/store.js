import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import index from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        users: [],
        current_user: {},
        loggedIn: false,
        loginError: '',
        registerError: '',
        // feed: [],

        passages: [],

        vocab_words: [],
    },
    getters: {
        current_user: state => state.current_user,
        loggedIn: state => state.loggedIn,
        loginError: state => state.loginError,
        registerError: state => state.registerError,
        // feed: state => state.feed,

        passages: state => state.passages,

        vocab_words: state => state.vocab_words,
    },
    mutations: {

        // Mutations for Users

        setCurUser(state, current_user) {
            console.log(`set current user mutation on ${current_user.first_name}`);
            state.current_user = current_user;
        },
        setLogin(state, status) {
            state.loggedIn = status;
        },
        setLoginError(state, message) {
            state.loginError = message;
        },
        setRegisterError(state, message) {
            state.registerError = message;
        },
        // setFeed(state, feed) {
        //     state.feed = feed;
        // },

        // Mutations for Passages
        
        setPassages(state, passages) {
            console.log(`set passages mutation`);
            state.passages = passages;
        },
        setPassage(state, passage) {
            console.log(`set passage mutation on ${passage.title}`);
            let id = passage.id;
            let passagesMap = state.passages.map(passage => { return passage.id; });
            let index = passagesMap.indexOf(id);
            Vue.set(passages, index, passage);
            console.log(state.passages)
        },

        // Mutations for Words

        setVocabWords(state, vocab_words) {
            console.log(`set words mutation`);
            state.vocab_words = vocab_words;
            console.log(state);
        },
        // setVocabWord(state, passage) {
        //     console.log(`set passage mutation on ${passage.title}`);
        //     let id = passage.id;
        //     let passagesMap = state.passages.map(passage => { return passage.id; });
        //     let index = passagesMap.indexOf(id);
        //     Vue.set(passages, index, passage);
        //     console.log(state.passages)
        // },
    },
    actions: {

        // Actions for Users

        updateCurUser(context, user) {
            console.log(`update curent user action on ${user.first_name}`);
            axios.get("/api/users/" + user.id, user).then(response => {
                context.commit('setCurUser', response.data);
                return true;
            }).catch(err => {
            });
        },

        // Registration, Login //
        register(context, user) {
            axios.post("/api/users", user).then(response => {
                context.commit('setCurUser', response.data.user);
                context.commit('setLogin', true);
                context.commit('setRegisterError', "");
                context.commit('setLoginError', "");
            }).catch(error => {
                context.commit('setLoginError', "");
                context.commit('setLogin', false);
                if (error.response) {
                    if (error.response.status === 403)
                        context.commit('setRegisterError', "That email address already has an account.");
                    else if (error.response.status === 409)
                        context.commit('setRegisterError', "That user name is already taken.");
                    return;
                }
                context.commit('setRegisterError', "Sorry, your request failed. We will look into it.");
            });
        },

        login(context, user) {
            axios.post("/api/login", user).then(response => {
                context.commit('setCurUser', response.data.user);
                context.commit('setLogin', true);
                context.commit('setRegisterError', "");
                context.commit('setLoginError', "");
            }).catch(error => {
                context.commit('setRegisterError', "");
                if (error.response) {
                    if (error.response.status === 403 || error.response.status === 400)
                        context.commit('setLoginError', "Invalid login.");
                    context.commit('setRegisterError', "");
                    return;
                }
                context.commit('setLoginError', "Sorry, your request failed. We will look into it.");
            });
        },

        logout(context, user) {
            context.commit('setCurUser', {});
            context.commit('setLogin', false);
        },

        // Actions for Passages

        getPassages(context) {
            console.log(`get passages action`);
            axios.get("/api/passages").then(response => {
                context.commit('setPassages', response.data);
                return true;
            }).catch(err => {
            });
        },
        addPassage(context, passage) {
            console.log(`add passage action on ${passage.title}`);
            axios.post("/api/passages", passage).then(response => {
                return context.dispatch('getPassages');
            }).catch(err => {
            });
        },
        updatePassage(context, passage) {
            console.log(`update passage action on ${passage.title}`);
            axios.put("/api/passages/" + passage.id, passage).then(response => {
                context.commit('setPassage', response.data);
            }).catch(err => {
            });
        },
        deletePassage(context, passage) {
            console.log(`delete passage action on ${passage.title}`);
            axios.delete("/api/passages/" + passage.id).then(response => {
                return context.dispatch('getPassages');
            }).catch(err => {
            });
        },

        // Actions for Vocabulary Words

        getVocabWords(context) {
            console.log(`getVocabWords action`);
            axios.get("/api/vocabulary").then(response => {
                context.commit('setVocabWords', response.data);
            }).catch(err => {
            });
        },
        // User Words //
        getUserVocab(context) {
            axios.get("/api/users/" + context.state.curUser.user_id + "/vocabulary").then(response => {
                context.commit('setVocabWords', response.data.vocabulary);
            }).catch(err => {
                console.log("getUserVocab failed:", err);
            });
        },

        addVocabWord(context, vocabWord) {
            console.log(`addVocabWord action on ${vocabWord.headword}`);
            axios.post("/api/vocabulary", vocabWord).then(response => {
                return context.dispatch('getVocabWords');
            }).catch(err => {
                console.log("addVocabWord failed:", err);
            });
        },

        addUserVocabWord(context, vocabWord) {
            console.log(`addUserVocabWord action on ${vocabWord.headword}`);
            axios.post("/api/users/" + context.state.curUser.user_id + "/vocabulary", vocabWord).then(response => {
                return context.dispatch('getVocabWords');
            }).catch(err => {
                console.log("addUserVocabWord failed:", err);
            });
        },
        // updateVocabWord(context, vocabWord) {
        //     console.log(`update VocabWord action on ${VocabWord.title}`);
        //     axios.put("/api/vocabulary/" + vocabWord.word_id, vocabWord).then(response => {
        //         context.commit('setVocabWord', response.data);
        //     }).catch(err => {
        //     });
        // },
        deleteVocabWord(context, vocabWord) {
            console.log(`delete VocabWord action on ${vocabWord.headword}`);
            axios.delete("/api/vocabulary/" + vocabWord.word_id).then(response => {
                return context.dispatch('getVocabWords');
            }).catch(err => {
            });
        },  
    }
});