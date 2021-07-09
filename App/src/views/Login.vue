<template>
  <v-app>
    <v-container justify = "center" style = "width: 100%;">
      <v-row align = "center">
        <v-col cols = "6" class = "pl-5">
          <div style = "height: 700px; width: 100%; background-color: red;" class = "pa-10">aaaa</div>
        </v-col>
        <v-col cols = "6" class = "pr-5">
          <Appbar/>
          <Form @login-request="checkLogin"/>
        </v-col>
      </v-row>
    </v-container>
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