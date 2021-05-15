<template>
    <v-container>
        <LeagueDataCard :league="league"></LeagueDataCard>
        <MyLeagueCard :league="myLeague" v-if="myLeague != null"></MyLeagueCard>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import LeagueDataCard from "@/components/LeagueDataCard.vue";
import MyLeagueCard from "@/components/MyLeagueCard.vue";
import LeagueData from "@/lib/models/league_data.js";
import {
    myLeagueInfo,
    getLeagueUsers,
    getUserProfile,
} from "@/lib/kickbase.js";

export default {
    name: "League",
    props: {
        league: LeagueData,
    },
    components: { LeagueDataCard, MyLeagueCard },
    data: () => ({
        myLeague: null,
    }),
    computed: {
        ...mapGetters(["token"]),
    },
    created: async function() {
        let leagueInfo = await myLeagueInfo(this.league.id, this.token);
        this.myLeague = leagueInfo;
        return;

        for (let u of users) {
            let manager = await getUserProfile(
                this.token,
                this.league.id,
                u.id
            );
            console.log(manager);
        }
    },
    watch: {
        async league() {
            let myLeague = await myLeagueInfo(this.league.id, this.token);
            this.myLeague = myLeague;
        },
    },
};
</script>
