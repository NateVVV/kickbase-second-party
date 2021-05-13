<template>
    <v-card class="mx-auto" max-width="344">
        <v-img height="344px" :src="user.profile" v-if="user.profile"></v-img>
        <v-card-title>{{ user.name }}</v-card-title>
        <v-card-text>{{ user.email }}</v-card-text>
        <v-card-text>
            <div>License: {{ user.licenses.license }}</div>
            <div>Points: {{ points }}</div>
            <div>ID: {{ user.id }}</div>
        </v-card-text>
    </v-card>
</template>

<script>
import { User } from "@/lib/models/user.js";

export default {
    name: "UserCard",
    props: {
        user: User,
    },
    computed: {
        points: function() {
            return this.user.points
                ? this.user.points
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                : "Unknown";
        },
    },
};
</script>
