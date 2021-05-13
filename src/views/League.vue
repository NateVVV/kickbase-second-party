<template>
    <v-container>
        <LeagueDataCard :league="league"></LeagueDataCard>
    </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import LeagueDataCard from "@/components/LeagueDataCard.vue";
import LeagueData from "@/lib/models/league_data.js";
import { myLeagueInfo } from "@/lib/kickbase.js";

export default {
    name: "League",
    props: {
        league: LeagueData,
    },
    components: { LeagueDataCard },
    data: () => ({}),
    computed: {
        ...mapGetters(["token"]),
    },
    created: async function() {
        let leagueInfo = await myLeagueInfo(this.league.id, this.token);
        console.log(leagueInfo);
    },
};
</script>
