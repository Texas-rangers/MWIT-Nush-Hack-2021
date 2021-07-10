<template>
  <v-app>
    <Appbar/>
    <v-card color = "transparent" flat style = "margin-top: 100px;">
      <div v-if="ShopExisted">      
        <p style = "font-size: 50px; line-height: 1;" class = "font-weight-bold">{{this.Shop.PlaceName}}</p>
        <p style = "font-size: 30px;">{{this.Shop.OwnerName}}</p>
        <p><v-icon left>mdi-map-marker</v-icon> {{this.Shop.Location}} <v-icon class = "px-2">mdi-phone</v-icon>{{this.Shop.Phone}}</p>

        <v-card-text class = "elevation-2 rounded-lg" style = "width: 80%; max-width: 600px; margin: auto;">{{this.Shop.Description}}</v-card-text>

        <IntervalSelect
          v-bind:shop = "Shop"
          v-bind:user = "Fullname"
          v-bind:useruid = "UserUID"
          v-bind:owneruid = "OwnerUID"
          v-bind:shopuid = "ShopUID"
        />
      </div>
      <div v-else>
        Shop in the URL doesn't exist, Too bad.
      </div>
    </v-card>
  </v-app>
</template>

<script>
import {RTDB} from "@/firebase";
import Appbar from "@/components/Appbar"
import firebase from "firebase"
import IntervalSelect from "@/components/IntervalSelect"

  export default {
    name: 'Book',

    components: {
      Appbar,
      IntervalSelect,
    },
    data(){
        return{
            ShopUID: "",
            Shop: [],
            UserUID: "",
            Firstname: "",
            Lastname: "",
            Fullname: "",
            ShopExisted: false,
            OwnerUID: "",
        }
    },
    methods: {
      convert(str){// 14-07-2020 10:15 - 10:30
        const dateinfo = {
          Day: Number(str.split(" ")[0].split("-")[0]),
          Month: Number(str.split(" ")[0].split("-")[1]),
          Year: Number(str.split(" ")[0].split("-")[2]),
          StartHour: Number(str.split(" ")[1].split(":")[0]),
          StartMin: Number(str.split(" ")[1].split(":")[1]),
          FinishHour: Number(str.split(" ")[3].split(":")[0]),
          FinishMin: Number(str.split(" ")[3].split(":")[1]),
        }
        return dateinfo
      }
    },
    async created(){
        this.ShopUID = this.$route.query.uid;
        
        await RTDB.ref(`shop`).once('value', snapshot => {
            const data = snapshot.val();
            Object.keys(data).forEach(key => {
                const InnerObj = data[key]
                Object.keys(InnerObj).forEach(key2 =>{
                    if(key2 == this.ShopUID){
                      this.ShopExisted = true;
                      var DD = [];
                      DD.push({id:key2, ...InnerObj[key2]});
                      this.Shop = DD[0];
                      this.OwnerUID = key;
                    }
                })
            })
        })
        console.log("B o " + this.OwnerUID)
        console.log("B s " + this.ShopUID)
        this.UserUID = firebase.auth().currentUser.uid;
        await RTDB.ref(`customer/${this.UserUID}`).once('value', snapshot => {
          const data = snapshot.val();
          if(data != null){
            this.hasName = true;
            var DD = [];
            DD.push({id:this.UID,...data})
            this.Firstname = DD[0].Firstname
            this.Lastname = DD[0].Lastname
          }
        })
        this.Fullname = this.Firstname + " " + this.Lastname;
        for(const key in this.Shop.Interval){
          this.Shop.Interval[key].intervalText = this.Shop.Interval[key].startTime + " " + this.Shop.Interval[key].finishTime;
        }
        console.log(this.Shop)
    },
  }
</script>