<template>
    <v-card
        style = "width: 80%;"
        max-width = "450"
        class = "rounded-xl py-5 px-7"
        flat
    >
        <v-form  class="form" @submit="onSubmit" ref="form" >
            <v-container
                justify = "center"
            >
                <v-row
                    justify = "center"
                    class = "font-weight-bold"
                    style = "font-size: 40px;"
                >Login</v-row>
                <v-row class = "py-3">
                    <v-text-field
                        label = "Username"
                        type = "text"
                        v-model ="Username"
                        :rule = "userRules"
                        prepend-icon="mdi-account-circle"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Password"
                        type = "password"
                        v-model ="Password"
                        :rule = "passwordRules"
                        prepend-icon="mdi-lock"
                    ></v-text-field>
                </v-row>
                <v-row justify = "center" class = "mb-3 mt-7 pt-3">
                    <v-btn 
                        type = "submit"
                        dark
                        rounded
                        block
                    >LOGIN</v-btn>
                </v-row>
            </v-container>
        </v-form>
        <v-container>
            Don't have an account?
            <router-link to="/register" style="text-decoration: none;" class = "font-weight-bold black--text"> 
                Register now!
            </router-link>
        </v-container>
    </v-card>
</template>

<script>

  export default {
    name: 'FormLogin',
    data(){
        return{
            Username: "",
            Password: ""
        }
    },
    methods:{
        onSubmit(e) {
            this.$refs.form.validate();
            e.preventDefault();
            const request = {
                Username: this.Username,
                Password: this.Password,
            }
            this.$emit('login-request', request);
            console.log("fuck");
        }
    },
    computed:{
        userRules() {
            const userRules = [
            v => !!v || "E-mail is required",
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
            return userRules;
        },
        passwordRules() {
            const passwordRules = [
            v => !!v || "Password is required",
            v => (v && v.length >= 6) || "Password should contain more than 6 characters",
            ]
            return passwordRules
            }
        }
    }
</script>