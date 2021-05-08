<template>
    <v-container>
        <v-card class="mx-auto" max-width="344">
            <v-img max-height="344px" max-width="344px" :src="league.picture"></v-img>
            <v-card-title>{{ league.name }}</v-card-title>
            <v-card-text>Users: {{ league.activeUsers }}</v-card-text>
            <v-card-actions>
                <v-btn color="orange lighten-2" text>
                    Explore
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon @click="show = !show">
                    <v-icon>
                        {{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}
                    </v-icon>
                </v-btn>
            </v-card-actions>
            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <v-card-text>
                        <div>Creator: {{ league.creator }}</div>
                        <div>Average Points: {{ league.averagePoints }}</div>
                        <div>Activity Index: {{ league.activityIndex }}</div>
                    </v-card-text>
                </div>
            </v-expand-transition>
        </v-card>
    </v-container>
</template>

<script>
import LeagueData from "@/lib/models/league_data.js";

export default {
    name: "LeagueDataCard",
    props: {
        league: LeagueData,
    },
    data: () => ({
        show: false,
    }),
};
</script>
