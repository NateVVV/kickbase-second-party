<template>
    <v-container>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field
            label="Password"
            type="password"
            v-model="password"
        ></v-text-field>
        <v-btn @click="login">Login</v-btn>
    </v-container>
</template>

<script>
import * as kickbase from "@/lib/kickbase.js";
import credentials from "@/lib/credentials.js";

export default {
    name: "Home",

    components: {},

    data: () => ({
        email: credentials.email,
        password: credentials.password,
    }),

    methods: {
        login: async function() {
            let { token, leagues } = await kickbase.login(
                this.email,
                this.password
            );
            console.log(token);
            console.log(leagues);
            let binBlau = leagues[0];
            let leagueInfo = await kickbase.leagueInfo(binBlau.id, token);
            console.log(leagueInfo);
        },
    },
};
</script>
