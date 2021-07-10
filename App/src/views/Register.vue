<template>
  <v-app>
    <Appbar/>
    <v-card
      style = "height: 100vh; align-items: center; display: flex; justify-content: center; background-color: #333333;"
    >
      <FormRegister @login-request="userRegister"/>
    </v-card>
  </v-app>
</template>

<script>
import FormRegister from '../components/FormRegister';
import Appbar from '../components/Appbar';
import firebase from "firebase";

  export default {
    name: 'Login',

    components: {
      FormRegister,
      Appbar,
    },
    methods: {
      async userRegister(r){
        try{
            console.log(r)
            await firebase.auth()
            .createUserWithEmailAndPassword(r.Username, r.Password)
            this.$router.push({name: "Login"})
        }catch(err){
            alert(err)
        }
      },
    }
  }
</script>