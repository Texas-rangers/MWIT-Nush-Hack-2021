<template>
  <v-app>
    <Appbar/>
    <v-card style = "height: 100vh; align-items: center; padding-top: 64px; justify-content: center;" flat>
      <div v-if="existed"> 
        <v-window v-model = "currentshop">
          <v-window-item
            v-for = "shop in this.D"
            :key = "shop.PlaceName"
          >
            <v-card color = "#333333" height = "250" tile 
              style = "display: flex; align-items: center; justify-content: center;"
              class = "white--text"
            >
              <v-container style = "margin-left: 8%;">
                <v-row style = "font-size: 60px;" class = "font-weight-bold">{{shop.PlaceName}}</v-row>
                <v-row style = "font-size: 30px;">{{shop.OwnerName}}</v-row>
                <v-row style = "font-size: 20px;" class = "grey--text text--lighten-1 mt-2">
                  {{shop.Location}} 
                  : ({{shop.Phone}})
                </v-row>
              </v-container>
              <v-card-text class = "white--text" style = "font-size: 20px; padding-right: 8%;">
                {{shop.Description}}
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
        <v-btn bl text @click="prev" style = "position: absolute; top: 64px; left: 0%; height: 250px;" class = "white--text">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-card-actions style = "display: flex; justify-content: center;">
          <v-item-group
            v-model="currentshop"
            class="text-center"
            mandatory
          >
            <v-item
              v-for="shop in D"
              :key="shop.PlaceName"
              v-slot="{ active, toggle }"
            >
              <v-btn
                :input-value="active"
                icon
                @click="toggle"
              >
                <v-icon small>mdi-record</v-icon>
              </v-btn>
            </v-item>
          </v-item-group>
        </v-card-actions>
        <v-btn text @click="next" class = "white--text" style = "position: absolute; top: 64px; right: 0%; height: 250px;">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
        
        <!--End of Windows-->
        <v-card class = "my-6" flat max-width = "600" style = "margin: auto; width: 80%">  
          <v-form @submit="updatePassword()">
            <v-text-field
              v-model = "PasswordInR"
              label = "PasswordIn"
            ></v-text-field>
            <v-text-field
              v-model = "PasswordOutR"
              label = "PasswordOut"
            ></v-text-field>
            <v-card style = "display: flex; align-items: center; justify-content: center;" flat>
              <v-dialog
                transition="dialog-top-transition"
                max-width="600"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="grey darken-4"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class = "mx-4"
                  >view password</v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar
                      color="grey darken-4"
                      dark
                    >View Your Password</v-toolbar>
                    <v-card
                      style = "display: flex; align-items: center; justify-content: center;"
                      flat
                    >
                      <v-card-text>
                        <p class = "font-weight-bold mb-10 mt-6" style = "font-size: 20px;">Password In</p>
                        <p style = "font-size: 60px;">{{D[currentshop].PasswordIn}}</p>
                      </v-card-text>
                      <v-card-text>
                        <p class = "font-weight-bold mb-10 mt-6" style = "font-size: 20px;">Password Out</p>
                        <p style = "font-size: 60px;">{{D[currentshop].PasswordOut}}</p>
                      </v-card-text>
                    </v-card>
                    <v-card-actions class="justify-end">
                      <v-btn
                        text
                        @click="dialog.value = false"
                      >Close</v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
              <v-btn
                :disabled = "!this.PasswordInR || !this.PasswordOutR"
                color = "red lighten-2 white--text"
                type = "submit"
              >Reset password</v-btn>
            </v-card>
          </v-form>
        </v-card>
        <v-divider></v-divider>
          <div v-if = "D[currentshop].hasOwnProperty('Queue')" >
            <div class = "font-weight-bold my-4" style = "font-size: 40px;">
              Queue
            </div>
            <v-list-group
              v-for = "(item, key) in D[currentshop].Queue"
              :key = "key"
              active-class = "font-weight-medium grey lighten-2 grey--text text--darken-3"
            >
              
              <template v-slot:activator>
                <v-list-item-title color = "grey lighten-4"
                >
                  {{key}}
                </v-list-item-title>
              </template>
              <v-list-item
                v-for = "(ck,user) in item"
                :key = "user"
              >
                <template>
                  <v-list-item-title>
                    {{user}} : 
                    <v-chip
                      :color="getColor(ck)"
                      dark
                    >
                    {{ ck }}
                  </v-chip>
                  </v-list-item-title>
                </template>
              </v-list-item>
            </v-list-group>
          </div>
          <div v-else class = "mt-5">There is no queue </div>
      </div>
      <div v-else> There is no shop, you can register for one</div>
      <v-card style = "align-items: center;" flat color = "transparent" class = "py-4">
        <v-btn @click="gotoNewshop" class = "mx-3" color = "grey darken-3" dark> REGISTER NEW SHOP </v-btn>
        <v-btn @click="deleteShop" class = "mx-3" color = "red lighten-1" dark> DELETE SHOP </v-btn>
      </v-card>
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
      D: [],
      /*
      D:
        shop1:
          description
          bla
          bla
          queue:
            date - time 1:
              CustomerName1: not arrived yet
              CustomerName2: not arrived yet
            date - time 2:
              CustomerName1: not arrived yet
            date - time 3:
              CustomerName1: not arrived yet
            // if date - time not existed = no customer have queued at this interval yet
      */
      UID: "",
      existed: false,
      currentshop: 0,
      PasswordIn : "",
      PasswordOut : "",
      PasswordInR : "",
      PasswordOutR : "",
    }
  },
  methods:{
    getColor(a){
      if(a == 'Haven\'t visited') return 'red';
      if(a == 'Haven\'t left') return 'amber';
      return 'green';
    },
    gotoNewshop(){
      this.$router.push({name: "Newshop"})
    },
    next () {
      this.currentshop = this.currentshop + 1 === this.D.length
        ? 0
        : this.currentshop + 1
    },
    prev () {
      this.currentshop = this.currentshop - 1 < 0
        ? this.D.length - 1
        : this.currentshop - 1
    },
    async deleteShop(){
      var idx = this.currentshop
      if(confirm("Are you sure you want to delete All information of " + this.D[idx].PlaceName + "?")){
        await RTDB.ref(`shop/${this.UID}`).child(this.D[idx].id).remove()
        idx = idx-1;
        if(idx < 0){
          idx=0;
        }
        this.currentshop = idx;
        this.$router.go()
       //console.log(this.D[idx].id)
      }
    },
    async updatePassword(){
      const P = {
        PasswordIn: this.PasswordIn, 
        PasswordOut: this.PasswordOut,
      }
      console.log(P)
      await RTDB.ref(`shop/${this.UID}/${this.D[this.currentshop].id}`).update(P);
    }
  },
  async created(){
    this.UID = firebase.auth().currentUser.uid;
    console.log(this.UID)
    await RTDB.ref(`shop/${this.UID}`).once('value', snapshot => {
      const data = snapshot.val();
      if(data != null){
        this.existed = true;
        Object.keys(data).forEach(key => {
        this.D.push({
          id:key ,...data[key]})
        })
      }
    })
    console.log(this.D)
    console.log(this.existed)
  },
  async mounted(){

  }
}
</script>
