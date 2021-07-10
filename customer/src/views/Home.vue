<template>
  <v-app>
    <Appbar/>
    <v-card style = "height: 100vh; display:flex; align-items: center; justify-content: center;" flat>
      <div v-if="hasName">
        <h1> Welcome, {{this.D.Firstname}} {{this.D.Lastname}}! </h1>
        <v-btn
          class = "mt-5"
          to = "/searchshop"
        >Book New Time</v-btn>
      </div>
      <div v-else>
        <h1> Welcome, {{this.EMAIL}}</h1>
        <v-form  class="form" @submit="getName" ref="form" >
                <v-container
                    justify = "center"
                >
                    <v-row
                        justify = "center"
                        class = "font-weight-bold"
                        style = "font-size: 40px;"
                    >Please enter your name first.</v-row>
                    <v-row class = "py-3">
                        <v-text-field
                            label = "First name"
                            type = "text"
                            v-model ="Firstname"
                        ></v-text-field>
                    </v-row>
                    <v-row>
                        <v-text-field
                            label = "Last name"
                            type = "text"
                            v-model ="Lastname"
                        ></v-text-field>
                    </v-row>
                    <v-row justify = "center" class = "mb-3 mt-7 pt-3">
                        <v-btn 
                            type = "submit"
                            dark
                            rounded
                            block
                        >Submit your name</v-btn>
                    </v-row>
                </v-container>
            </v-form>
      </div>
    </v-card>
  </v-app>
</template>

<script>
// @ is an alias to /src
import {RTDB} from "@/firebase"
import firebase from "firebase"
import Appbar from "../components/Appbar"

export default {
  name: 'Home',
  components: {
    Appbar,
  },
  data() {
    return {
      Firstname: "",
      Lastname: "",
      UID: "",
      EMAIL: "",
      hasName: false,
      D: [],
    }
  },
  methods:{
    getName(e){
      e.preventDefault();
      if(this.Firstname == "" || this.Lastname == ""){
        alert("Please enter your name before submitting");
        return;
      }
      const Name = {
        Firstname: this.Firstname,
        Lastname: this.Lastname,
      }
      RTDB.ref(`customer/${this.UID}`).update(Name)
      this.$router.go()
    }
  },
  async created(){
    this.UID = firebase.auth().currentUser.uid;
    this.EMAIL = firebase.auth().currentUser.email;
    console.log(this.UID)
    await RTDB.ref(`customer/${this.UID}`).once('value', snapshot => {
      const data = snapshot.val();
      if(data != null){
        this.hasName = true;
        var DD = [];
        DD.push({id:this.UID,...data})
        this.D = DD["0"]
      }
    })
    console.log(firebase.auth().currentUser.email)
    console.log(this.D)
  },
}
</script>
