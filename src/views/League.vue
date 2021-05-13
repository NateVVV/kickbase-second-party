<template>
    <v-container>
        <LeagueDataCard :league="league"></LeagueDataCard>
        <MyLeagueCard :league="myLeague" v-if="myLeague != null"></MyLeagueCard>
        <UserCard v-for="user in users" :key="user.id" :user="user"></UserCard>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import LeagueDataCard from "@/components/LeagueDataCard.vue";
import MyLeagueCard from "@/components/MyLeagueCard.vue";
import UserCard from "@/components/UserCard.vue";
import LeagueData from "@/lib/models/league_data.js";
import {
    myLeagueInfo,
    getLeagueUsers,
} from "@/lib/kickbase.js";

export default {
    name: "League",
    props: {
        league: LeagueData,
    },
    components: { LeagueDataCard, MyLeagueCard, UserCard },
    data: () => ({
        myLeague: null,
        users: [],
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    created: async function() {
        let leagueInfo = await myLeagueInfo(this.league.id, this.token);
        this.myLeague = leagueInfo;

        let users = await getLeagueUsers(this.token, this.league.id);
        this.users = users;
    },
    watch: {
        async league() {
            let [myLeague, users] = await Promise.all([
                myLeagueInfo(this.league.id, this.token),
                getLeagueUsers(this.token, this.league.id),
            ]);
            this.myLeague = myLeague;
            this.users = users;
        },
    },
};
</script>
