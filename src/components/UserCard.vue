<template>
    <v-container>
        <v-card class="mx-auto" max-width="344">
            <v-img height="344px" :src="user.profile"></v-img>
            <v-card-title>{{ user.name }}</v-card-title>
            <v-card-text>{{ user.email }}</v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import User from "@/lib/models/user.js";

export default {
    name: "UserCard",
    props: {
        user: User,
    },
};
</script>
