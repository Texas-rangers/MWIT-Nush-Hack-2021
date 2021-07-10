<template>
  <v-app>
    <Appbar/>
    <v-card style = "padding-top: 100px; margin-bottom: 40px; display:flex; align-items: center; justify-content: center;" flat>
      
      <div v-if="hasName">
        <h1> Welcome, {{this.D.Firstname}} {{this.D.Lastname}}! </h1>
        <v-btn
          class = "mt-5"
          to = "/searchshop"
          color = "blue accent-2"
          dark
        >Book New Time</v-btn>
      </div>
      <div v-else style = "padding-top: 50px;">
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
    <!-- <v-btn @click="console.log(this.D)">bedug</v-btn> -->
    <v-card v-show="hasName" style = "width: 80%; margin-left: auto; margin-right: auto;" max-width = "900">
      <v-simple-table fixed-header @click:row="handleClick">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-center">
                  Shop
                </th>
                <th class="text-center">
                  Date
                </th>
                <th class="text-center">
                  Time
                </th>
                <th class="text-center">
                  Status
                </th>
                <th class="text-center">
                  Check
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(val, key) in D.Queue"
                :key="key"
              >
                <td>{{ val.PlaceName }}</td>
                <td>{{ key.slice(0,10) }}</td>
                <td>{{ key.slice(11) }}</td>
                <td>
                  <v-chip
                    :color="getColor(val[D.Fullname])"
                    dark
                  >
                    {{ val[D.Fullname] }}
                  </v-chip>
                </td>
                <td>
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        v-bind="attrs"
                        v-on="on"
                        :disabled = "val[D.Fullname] == 'Visited and left'"
                        icon
                        @click="TrackData(val.ShopUID, val[D.Fullname], key)"
                      ><v-icon>mdi-map-marker</v-icon></v-btn>
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar
                          class="font-weight-bold"
                          color="primary"
                          dark
                        >Please type in your code...</v-toolbar>
                        <v-form @submit.prevent="SendShopPassword()" class = "mx-10 pt-9">
                          <v-text-field
                            v-model = "ShopPassword"
                            outlined
                          >
                          </v-text-field>
                          <v-card-actions class="text-center pb-5" style = "display: flex; justify-content: center; align-items: center;">

                            <v-btn
                              :disabled = "!ShopPassword"
                              color = "blue accent-2"
                              type = "submit"
                              class = "white--text"
                              @click="dialog.value = false"
                            >Send password</v-btn>

                            <v-btn
                              @click="dialog.value = false"
                            >Cancel</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card>
                    </template>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--<v-btn @click="getPasswordOut('-MeEQqBasiqy4TKJ1BIW')"> DEBUG </v-btn>-->
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
      P: null,
      ShopPassword : "",
      Status: "",
      dateinfo: "",
      ShopUID: "",
      OwnerUID: "",
    }
  },
  methods:{
    getColor(a){
      if(a == 'Haven\'t visited') return 'red';
      if(a == 'Haven\'t left') return 'amber';
      return 'green';
    },
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
    },
    async getPasswordIn(uid){
      this.P = null;
      await RTDB.ref(`shop`).once('value', snapshot => {
          const data = snapshot.val();
          Object.keys(data).forEach(key => {
              const InnerObj = data[key]
              Object.keys(InnerObj).forEach(key2 =>{
                  if(key2 == uid){
                    this.P = InnerObj[key2]["PasswordIn"];
                    this.OwnerUID = key;
                  }
              })
          })
      })
      console.log(this.P);
    },
    async getPasswordOut(uid){
      this.P = null;
      await RTDB.ref(`shop`).once('value', snapshot => {
          const data = snapshot.val();
          Object.keys(data).forEach(key => {
              const InnerObj = data[key]
              Object.keys(InnerObj).forEach(key2 =>{
                  if(key2 == uid){
                    this.P = InnerObj[key2]["PasswordOut"];
                    this.OwnerUID = key;
                  }
              })
          })
      })
    },
    async updateStatus(){
      var q = {};
      if(this.Status == "Haven't visited"){
        q[this.D.Fullname + ""] = "Haven't left";
        await this.getPasswordIn(this.ShopUID);
      }
      if(this.Status == "Haven't left"){
        q[this.D.Fullname + ""] = "Visited and left";
        await this.getPasswordOut(this.ShopUID);
      }
      console.log(this.ShopPassword)
      console.log(this.P)
      if(this.P != this.ShopPassword){
        alert("Incorrect password. Please contact the owner of the location to get it.");
        return;
      }
      alert("Correct password");
      this.ShopPassword = "";
      this.P = "";
      
      await RTDB.ref(`customer/${this.UID}/Queue/${this.dateinfo}`).update({...q});
      await RTDB.ref(`shop/${this.OwnerUID}/${this.ShopUID}/Queue/${this.dateinfo}`).update({...q});
      this.$router.go();
    },
    SendShopPassword(){
      //send to data base
      //this.ShopPassword = e.ShopPassword;
      this.updateStatus();
      //this.ShopPassword = "";
    },
    TrackData(inp_shopuid, inp_status, inp_dateinfo){
      this.ShopUID = inp_shopuid;
      this.Status = inp_status;
      this.dateinfo = inp_dateinfo;
      
      console.log(this.Status)
      console.log(this.ShopUID)
    },
    
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
        this.D = DD["0"];
        this.D["Fullname"] = this.D.Firstname + " " + this.D.Lastname;
      }
    })
    console.log(firebase.auth().currentUser.email)
    console.log(this.D)
  },
}
</script>

<style>
  .v-text-field input {
    font-size: 30px;
  }
</style>