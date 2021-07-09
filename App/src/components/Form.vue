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
                        prepend-icon="mdi-account-circle"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Password"
                        type = "password"
                        v-model ="Password"
                        prepend-icon="mdi-lock"
                    ></v-text-field>
                </v-row>
                <v-row justify = "center" class = "mb-3 mt-7 py-3">
                    <v-btn 
                        type = "submit"
                        dark
                        rounded
                        block
                    >LOGIN</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>

  export default {
    name: 'Form',
    data(){
        return{
            Username: "",
            Password: ""
        }
    },
    methods:{
        onSubmit(e) {
            this.$refs.form.validate()
            if(!this.Username){
                alert('Please enter your username'); return;
            }if(!this.Password){
                alert('Please enter your password'); return;
            }
            e.preventDefault();
            const request = {
                Username: this.Username,
                Password: this.Password,
            }
            this.$emit('login-request', request);
            console.log("fuck");
        }
    }
  }
</script>