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
import { login } from "@/lib/kickbase.js";
export default {
    name: "login",
    props: {
        email: String,
        password: String,
    },
    methods: {
        login: async function() {
            let { user, token, leagues } = await login(
                this.email,
                this.password
            );
            this.$emit("loggedIn", { user, token, leagues });
        },
    },
};
</script>
