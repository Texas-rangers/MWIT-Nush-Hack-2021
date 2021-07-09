<template>
  <v-app>
    <v-card
      style = "height: 700px; margin-top: 150px;"
      align = "center"
      justify = "center"
      color = "light-blue lighten-4"
      flat
    >
      <Appbar/>
      <Form2 @login-request="checkLogin"/>
    </v-card>
  </v-app>
</template>

<script>
import Form2 from '../components/Form2'
import Appbar from '../components/Appbar'

  export default {
    name: 'Login',

    components: {
      Form2,
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