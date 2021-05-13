<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
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
        <v-navigation-drawer app v-model="drawer" class="pt-4">
            <v-list nav dense>
                <v-list-item-group
                    v-model="leagueGroup"
                    active-class="deep-purple--text text--accent-4"
                    v-show="leagues"
                    mandatory
                >
                    <v-list-item v-for="league in leagues" :key="league.id">
                        <v-list-item-title>{{ league.name }}</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-main>
            <Login v-on:loggedIn="onLogin" v-if="token === null"></Login>
            <UserCard
                :user="user"
                v-if="token !== null && leagueGroup === null"
            ></UserCard>
            <League
                v-if="leagueGroup !== null"
                :league="leagues[leagueGroup]"
            ></League>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import UserCard from "@/components/UserCard.vue";
import League from "@/views/League.vue";

export default {
    name: "App",

    components: { Login, UserCard, League },

    data: () => ({
        user: null,
        leagues: null,
        drawer: false,
        leagueGroup: null,
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    watch: {
        leagueGroup() {
            this.drawer = false;
        },
    },
    methods: {
        onLogin: async function({ user, leagues }) {
            this.user = user;
            this.leagues = leagues;
            console.log(this.user);
            console.log(this.leagues);
        },
    },
};
</script>
