import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        passages: [],
    },
    getters: {
        passages: state => state.passages,
    },
    mutations: {
        setPassages(state, passages) {
            state.passages = passages;
        },
    },
    actions: {
        getPassages(context) {
            console.log("getting passages");
            axios.get("/api/passages").then(response => {
                context.commit('setPassages', response.data);
                return true;
            }).catch(err => {
            });
        },
        addPassage(context, passage) {
            axios.post("/api/passages", passage).then(response => {
                return context.dispatch('getPassages');
            }).catch(err => {
            });
        },
        updatePassage(context, passage) {
            axios.put("/api/passages/" + passage.id, passage).then(response => {
                return true;
            }).catch(err => {
            });
        },
        deletePassage(context, passage) {
            axios.delete("/api/passages/" + passage.id).then(response => {
                return context.dispatch('getPassages');
            }).catch(err => {
            });
        }
    }
});