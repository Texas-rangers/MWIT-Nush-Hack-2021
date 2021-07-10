<template>
  <v-app>
    <Appbar/>
    <div style="width: 100vw; height: 100vh;">
      <v-card
        style="width: 55vw; height: 100vh; background-color: #4A8FFF; align-items: center; display: flex; justify-content: center;"
        class = "white--text"
      >
        <v-container>
          <v-row justify = "center" style = "font-size: 100px;">
            ระบบจองเวลา
          </v-row>
          <v-row justify = "center" style = "font-size: 36px;">
            จัดทำโดยทีมงาน YaakPenMor
          </v-row>
        </v-container>
      </v-card>
    <v-card
      style = "position: absolute; left: 62.5%; top: 30%; width: 40%;"
      flat
    ><FormLogin @login-request="checkLogin"/></v-card>
          
    </div>
  </v-app>
</template>

<script>
import FormLogin from '../components/FormLogin'
import Appbar from '../components/Appbar'
import firebase from 'firebase'

  export default {
    name: 'Login',

    components: {
      FormLogin,
      Appbar,
    },
    methods: {
      async checkLogin(r){
        try{
          await firebase.auth()
            .signInWithEmailAndPassword(r.Username, r.Password)
            //this.$router.push({name: "Search"})
            this.$router.push({name: "Home"})
        }catch(err){
          alert(err)
        }
      }
    }
  }
</script>