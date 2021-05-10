<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn
                href="https://github.com/vuetifyjs/vuetify/releases/latest"
                target="_blank"
                text
            >
                <span class="mr-2">Latest Release</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-main>
            <Login v-on:loggedIn="onLogin" v-if="token === null"></Login>
            <UserCard :user="user" v-if="token !== null"></UserCard>
            <LeagueDataCard
                v-for="league in leagues"
                :key="league.id"
                :league="league"
            ></LeagueDataCard>
        </v-main>
    </v-app>
</template>

<script>
import Login from "@/components/Login.vue";
import UserCard from "@/components/UserCard.vue";
import LeagueDataCard from "@/components/LeagueDataCard.vue";
import { myLeagueInfo } from "@/lib/kickbase.js";

export default {
    name: "App",

    components: { Login, UserCard, LeagueDataCard },

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
