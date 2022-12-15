import { createStore } from 'vuex'
import axios from "axios"

export default createStore({
    state: {
        users: [],
    },
    getters: {
        getUsers: (state) => state.users,
        getOneUser: (state) => (id) => state.users.find((user) => user._id === id),
    },
    actions: {
        async fetchUsers({ commit }) {
            try {
                const data = await axios.get(
                    "http://localhost:3000/users"
                );
                commit("SET_USERS", data.data);
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
    }
})
