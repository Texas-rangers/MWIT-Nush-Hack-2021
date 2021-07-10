<template>
    <v-app-bar
        app
        dark
        color = "grey-darken-4"
    >
        <v-toolbar-title class = "font-weight-bold white--text">
            <router-link to="/home" style="text-decoration: none;" class = "white--text"> 
                Simple Booking System 
            </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
    <v-btn @click="logOut" text>LOGOUT<v-icon right>mdi-exit-to-app</v-icon></v-btn>
    </v-app-bar>
</template>
<script>
import firebase from "firebase"
export default {
    methods: {
        async logOut(){
            try{
                const data = await firebase.auth().signOut();
                console.log(data)
                this.$router.replace({name: "Login"})
            }catch(err){
                alert(err)
            }
        },
    },
}
</script>