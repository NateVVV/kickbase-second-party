<template>
    <v-app>
        <v-app-bar app color="white" flat>
            <v-container class="py-0 fill-height">
                <v-avatar
                    class="mr-10"
                    color="grey darken-1"
                    size="32"
                    @click="selectCategory(null)"
                ></v-avatar>

                <v-btn
                    v-for="(link, n) in links"
                    :key="n"
                    text
                    color="primary"
                    @click="selectCategory(n)"
                >
                    {{ link }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-responsive max-width="260">
                    <v-text-field
                        dense
                        flat
                        hide-details
                        rounded
                        solo-inverted
                    ></v-text-field>
                </v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="grey lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list nav dense>
                                <v-list-item-group
                                    v-model="selectedLeague"
                                    active-class="deep-purple--text text--accent-4"
                                    v-show="leagues"
                                    mandatory
                                >
                                    <v-list-item
                                        v-for="league in leagues"
                                        :key="league.id"
                                    >
                                        <v-list-item-title>{{
                                            league.name
                                        }}</v-list-item-title>
                                    </v-list-item>
                                </v-list-item-group>
                                <v-divider class="my-2"></v-divider>
                                <v-list-item link color="grey lighten-4">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            Logout
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <v-sheet min-height="70vh" rounded="lg">
                            <Login
                                v-on:loggedIn="onLogin"
                                v-if="token === null"
                            ></Login>
                            <UserCard
                                :user="user"
                                v-if="
                                    token !== null && selectedCategory === null
                                "
                            ></UserCard>
                            <League
                                v-if="token !== null && selectedCategory == 0"
                                :league="leagues[selectedLeague]"
                            ></League>
                            <LeagueUsers
                                v-if="token !== null && selectedCategory == 1"
                                :league="leagues[selectedLeague]"
                            ></LeagueUsers>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Login from "@/components/Login.vue";
import UserCard from "@/components/UserCard.vue";
import League from "@/views/League.vue";
import LeagueUsers from "@/views/LeagueUsers.vue";

export default {
    name: "App",

    components: { Login, UserCard, League, LeagueUsers },

    data: () => ({
        user: null,
        leagues: null,
        selectedLeague: null,
        selectedCategory: 0,
        links: ["Dashboard", "User", "Statistics"],
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    methods: {
        onLogin: async function({ user, leagues }) {
            this.user = user;
            this.leagues = leagues;
            console.log(this.user);
            console.log(this.leagues);
        },
        selectCategory(number) {
            this.selectedCategory = number;
            console.log("Selected:", number);
        },
    },
};
</script>
