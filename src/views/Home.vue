<template>
    <v-container>
        <Login
            :email="email"
            :password="password"
            v-on:loggedIn="onLogin"
            v-if="token === null"
        ></Login>
    </v-container>
</template>

<script>
import credentials from "@/lib/credentials.js";

import Login from "@/components/Login.vue";

export default {
    name: "Home",

    components: { Login },

    data: () => ({
        email: credentials.email,
        password: credentials.password,
        user: null,
        token: null,
        leagues: null,
    }),

    methods: {
        onLogin: function(value) {
            this.user = value.user;
            this.token = value.token;
            this.leagues = value.leagues;
            console.log("Logged in");
        },
    },
};
</script>
