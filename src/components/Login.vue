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
import credentials from "@/lib/credentials.js";
import { login } from "@/lib/kickbase.js";
import User from "@/lib/models/user.js";

export default {
    name: "login",
    data: () => ({
        email: credentials.email,
        password: credentials.password,
    }),
    methods: {
        login: async function() {
            let { user, token, leagues } = await login(
                this.email,
                this.password
            );
            this.$emit("loggedIn", { user: new User(user), token, leagues });
        },
    },
};
</script>
