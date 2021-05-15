<template>
    <v-card flat tile class="d-flex flex-wrap justify-start align-start">
        <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
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
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    created: async function() {
        let users = await getLeagueUsers(this.token, this.league.id);
        this.users = users;
    },
    watch: {
        async league() {
            let users = await getLeagueUsers(this.token, this.league.id);
            this.users = users;
        },
    },
};
</script>
