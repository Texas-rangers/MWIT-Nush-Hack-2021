<template>
  <v-app>
    <Appbar/>
    <v-card
      color = "transparent"
      style = "margin-top: 100px; font-size: 40px;"
      class = "py-6 font-weight-bold"
      flat
    >
    Shop List<br>
    <v-card-text style = "font-size: 20px;">Book Your Time Here!</v-card-text>
    </v-card>
    <v-card class = "mx-10 mb-10">
      <v-list>
        <v-list-group
          v-for="item in this.Shop"
          :key="item.id"
          style = "text-align: left;"
          active-class="light-blue lighten-4 blue--text text--darken-1 font-weight-bold"
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.PlaceName + ' (' + item.OwnerName + ')'" left></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content class = "pl-4 py-6">
              <v-card flat color = "pl-5" style = "padding-right: 20%;">
                <p><v-icon left>mdi-account</v-icon>{{item.OwnerName}}</p>
                <p><v-icon left>mdi-map-marker</v-icon>{{item.Location}}</p>
                <p><v-icon left>mdi-phone</v-icon>{{item.Phone}}</p>
                <p><v-icon left>mdi-text</v-icon>{{item.Description}}</p>
              </v-card>
              <v-btn
                style = "position: absolute; right: 2%;"
                dark
                color = "blue accent-2"
                @click ="gotoBook(item)"
              >BOOK THIS SHOP</v-btn>
              <div style = "width: 100%; height: 2px; background-color: #DDDDDD;"></div>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
  </v-app>
</template>

<script>
import {RTDB} from "@/firebase";
import Appbar from "@/components/Appbar"

  export default {
    name: 'Searchshop',

    components: {
      Appbar,
    },
    data(){
        return{
            Shop: [],
        }
    },
    methods: {
        gotoBook(e){
            this.$router.push({name: "Book", query: {uid: e.id}})
        }
    },
    async created(){
        await RTDB.ref(`shop`).once('value', snapshot => {
            const data = snapshot.val();
            if(data != null){
                Object.keys(data).forEach(key => {
                    const InnerObj = data[key]
                    Object.keys(InnerObj).forEach(key2 =>{
                        this.Shop.push({id:key2, ...InnerObj[key2]})
                    })
                })
            }
        })
        console.log(this.Shop)
    }
  }
</script>