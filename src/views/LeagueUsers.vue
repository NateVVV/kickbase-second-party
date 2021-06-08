<template>
    <v-card flat tile class="d-flex flex-wrap justify-start align-start">
        <div class="text-center" v-if="loading">
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
        </div>
        <v-navigation-drawer permanent expand-on-hover v-else>
            <v-list two-line>
                <v-list-item-group
                    v-model="selectedUsers"
                    multiple
                    color="primary"
                >
                    <v-list-item
                        v-for="user in users"
                        :key="user.id"
                        class="px-2"
                    >
                        <v-list-item-avatar>
                            <v-img
                                :src="user.profile"
                                v-if="user.profile"
                            ></v-img>
                            <v-icon class="grey lighten-1" dark v-else></v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{
                                user.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>{{
                                user.points
                            }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        <UserCard
            v-for="u in selectedUsers"
            :key="u"
            :user="users[u]"
            class="ma-3"
        ></UserCard>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "@/components/UserCard.vue";
import LeagueData from "@/lib/models/league_data.js";
import { getLeagueUsers } from "@/lib/kickbase.js";

export default {
    name: "LeagueUsers",
    props: {
        league: LeagueData,
    },
    components: { UserCard },
    data: () => ({
        users: [],
        loading: true,
        drawer: true,
        selectedUsers: [],
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    created: async function() {
        let users = await getLeagueUsers(this.token, this.league.id);
        this.users = users;
        this.loading = false;
    },
    watch: {
        async league() {
            let users = await getLeagueUsers(this.token, this.league.id);
            this.users = users;
            this.selectedUsers = null;
        },
    },
    methods: {
        showDetails: function() {
            console.log("test");
        },
    },
};
</script>
