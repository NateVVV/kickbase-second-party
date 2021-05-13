<template>
    <v-container>
        <v-text-field label="Email" v-model="email"></v-text-field>
        <v-text-field
            label="Password"
            type="password"
            v-model="password"
        ></v-text-field>
        <v-btn @click="login" :loading="loading" :disabled="loading">
            Login
        </v-btn>
    </v-container>
</template>

<script>
import credentials from "@/lib/credentials.js";
import { login } from "@/lib/kickbase.js";

export default {
    name: "Login",
    data: () => ({
        email: credentials.email,
        password: credentials.password,
        loading: false,
    }),
    methods: {
        login: async function() {
            this.loading = true;
            let { user, token, leagues } = await login(
                this.email,
                this.password
            );
            this.$store.commit("setToken", token);
            this.$emit("loggedIn", { user, leagues });
            this.loading = false;
        },
    },
};
</script>
