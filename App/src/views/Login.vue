<template>
  <v-app>
    <Appbar/>
    <div style="width: 100vw; height: 100vh;">
      <v-card
        style="width: 55vw; height: 100vh; background-color: black; align-items: center; display: flex; justify-content: center;"
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
    <!-- <v-container style = "width: 100vw; height: 100vh;">
      <v-row align = "center">
        <v-col cols = "6" style = "padding: 0px; margin: 0px;">
          <v-card style = "background-color: red; width: 100vw; min-height: 100vh;" tile flat></v-card>
        </v-col>
        <v-col cols = "6" justify = "center">
          <Appbar/>
          <Form @login-request="checkLogin"/>
        </v-col>
      </v-row>
    </v-container> -->
    <v-card
      style = "position: absolute; left: 62.5%; top: 30%; width: 40%;"
      flat
    ><Form @login-request="checkLogin"/></v-card>
          
    </div>
  </v-app>
</template>

<script>
import Form from '../components/Form'
import Appbar from '../components/Appbar'

  export default {
    name: 'Login',

    components: {
      Form,
      Appbar,
    },
    methods: {
      checkLogin(r){
        console.log(r.Username)
        alert("FUCK")
      }
    }
  }
</script>