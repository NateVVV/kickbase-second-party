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
import { myLeagueInfo } from "@/lib/kickbase.js";

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
        console.log(leagueInfo);
        this.myLeague = leagueInfo;
    },
    watch: {
        async league() {
            this.myLeague = await myLeagueInfo(this.league.id, this.token);
        },
    },
};
</script>
