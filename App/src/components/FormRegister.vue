<template>
    <v-card
        style = "width: 80%;"
        max-width = "500"
        class = "rounded-xl px-6 py-4"
    >
        <v-form  class="form" @submit="onSubmit" ref="form" v-model="valid" lazy-validation>
            <v-container
                justify = "center"
            >
                <v-row style = "font-size: 45px;" class = "font-weight-bold" justify = "center">Register</v-row>
                <v-row>
                    <v-text-field
                        label = "Username"
                        type = "text"
                        v-model ="Username"
                        :rules = "userRules"
                        required
                        prepend-icon="mdi-account-circle"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Password"
                        type = "password"
                        v-model ="Password"
                        :rules = "passwordRules"
                        prepend-icon="mdi-lock"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Password Confirmation"
                        type = "password"
                        v-model ="RePassword"
                        :rules = "repasswordRules"
                        prepend-icon="mdi-lock"
                        required
                    ></v-text-field>
                </v-row>
                <v-row justify = "center" class = "py-3">
                    <v-btn 
                        type = "submit"
                        dark
                        rounded
                        block
                    >REGISTER</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>

  export default {
    name: 'FormRegister',
    data(){
        return{
            Username: "",
            Password: "",
            RePassword: "",
        }
    },
    methods:{
        onSubmit(e) {
            this.$refs.form.validate();
            e.preventDefault();
            if(this.Password != this.RePassword){
                alert("Two passwords don't match each other");
                return;
            }
            const request = {
                Username: this.Username,
                Password: this.Password,
                RePassword: this.RePassword,
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
        },
        repasswordRules(){
            const repasswordRules = [v => !!v || "Password confirmation is required",]
            if(this.Password){
                const cond1 = 
                v => (!!v && v) === this.Firstpass || "Password does not match"
                repasswordRules.push(cond1)
            }
            return repasswordRules;
        }
    }
  }
</script>