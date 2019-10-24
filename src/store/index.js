import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);
const resourceHost = 'http://localhost:3000';

export const store  = new Vuex.Store({
    state: {
        loginedID: null,
        loginedEmail : "",
        feedCategories : [
            "Software", "Hardware", "Technology", "Tips", "Reviews", "Misc"
        ],
    },
    getters: {
        getLoginedID: function (state) {
            return state.loginedID;
        },
        getLoginedEmail: function (state) {
            return state.loginedEmail;
        }
    },
    mutations: {
        LOGIN (state, payload) {
            state.loginedID = payload.id;
            state.loginedEmail = payload.email;
        },
        LOGOUT (state) {
            state.loginedID = null;
        }
    },
    actions: {
        LOGIN ({commit}, {id, email}) {
            commit('LOGIN');
            return axios.post(`${resourceHost}/login`, {id, email})
                .then(({data}) => commit('LOGIN', data))
        },
        LOGOUT ({commit}) {
            commit('LOGOUT');
            return axios.delete(`${resourceHost}/login`)
                .then(resp => {
                    console.log(resp.data)
                }).catch(error => {
                    console.log(error);
                });
        },
    }
} );