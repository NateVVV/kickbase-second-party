<template>
    <v-container>
        <Login v-on:loggedIn="onLogin" v-if="token === null"></Login>
    </v-container>
</template>

<script>
import Login from "@/components/Login.vue";
import { myLeagueInfo } from "@/lib/kickbase.js";

export default {
    name: "Home",

    components: { Login },

    data: () => ({
        user: null,
        token: null,
        leagues: null,
    }),

    methods: {
        onLogin: async function(value) {
            this.user = value.user;
            this.token = value.token;
            this.leagues = value.leagues;
            console.log("Logged in");
            console.log(this.user);
            console.log(this.leagues);
            for (let league of this.leagues) {
                let leagueInfo = await myLeagueInfo(league.id, this.token);
                console.log(leagueInfo);
            }
        },
    },
};
</script>
