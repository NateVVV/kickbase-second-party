<template>
    <v-container>
        <Login
            v-on:loggedIn="onLogin"
            v-if="token === null"
        ></Login>
    </v-container>
</template>

<script>
import Login from "@/components/Login.vue";

export default {
    name: "Home",

    components: { Login },

    data: () => ({
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
