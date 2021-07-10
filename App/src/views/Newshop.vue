<template>
  <v-app>
    <v-card
      flat
      style = "height: 120vh; width: 100vw; display: flex; justify-content: center; align-items: center; padding-top: 150px; 
      padding-bottom: 100px; background-color: #333333;"
    >
      <Appbar/>
      <FormShopRegister @login-request="shopRegister"/>
    </v-card>
  </v-app>
</template>

<script>
import FormShopRegister from '../components/FormShopRegister'
import Appbar from '../components/Appbar'
import {RTDB} from "@/firebase";
import firebase from "firebase"

  export default {
    name: 'Newshop',

    components: {
      FormShopRegister,
      Appbar,
    },
    methods: {
      async shopRegister(r){
        try{
            const user = firebase.auth().currentUser;
            if(!user){
                alert("Please login first.");
                return;
            }
            await RTDB.ref(`shop/${user.uid}`).push(r)
            console.log(r)
            console.log(user)
        }catch(err){
            alert(err)
        }
      },
      async checkUID(){
          const user = firebase.auth().currentUser;
          console.log(user)
      }
    }
  }
</script>