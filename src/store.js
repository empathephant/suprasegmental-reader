import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';
import index from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        current_user: {},
        users: [],
        passages: [],
    },
    getters: {
        passages: state => state.passages,
        current_user: state => state.current_user,
    },
    mutations: {
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
        setCurUser(state, current_user) {
            console.log(`set current user mutation on ${current_user.first_name}`);
            state.current_user = current_user;
        },
    },
    actions: {
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
                return true;
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
        
        updateCurUser(context, user) {
            console.log(`update curent user action on ${user.first_name}`);
            axios.get("/api/users/" + user.id, user).then(response => {
                context.commit('setCurUser', response.data);
                return true;
            }).catch(err => {
            });
        },
    }
});