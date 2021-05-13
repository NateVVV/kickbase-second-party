<template>
    <v-card class="mx-auto" max-width="344">
        <div class="d-flex justify-space-between caption ma-2">
            <div>
                <div class="grey--text mb-2">
                    Budget
                </div>

                <div
                    class="font-weight-medium"
                    :class="{ 'green--text': league.budget > 0 }"
                >
                    {{ budget }} €
                </div>
            </div>

            <div>
                <div class="grey--text mb-2">
                    Teamvalue
                </div>

                <div class="font-weight-medium">{{ teamValue }} €</div>
            </div>

            <div>
                <div class="grey--text mb-2">
                    Placement
                </div>

                <div class="font-weight-medium">{{ league.placement }}.</div>
            </div>

            <div>
                <div class="grey--text text-darken-1 mb-2">
                    Points
                </div>

                <div class="font-weight-medium">
                    {{ points }}
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import MyLeague from "@/lib/models/my_league.js";

export default {
    name: "MyLeagueCard",
    props: {
        league: MyLeague,
    },
    data: () => ({}),
    computed: {
        teamValue: function() {
            return this.league.teamValue
                ? this.league.teamValue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : 0;
        },
        budget: function() {
            return this.league.budget
                ? this.league.budget
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : 0;
        },
        points: function() {
            return this.league.points
                ? this.league.points
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : 0;
        },
    },
};
</script>
