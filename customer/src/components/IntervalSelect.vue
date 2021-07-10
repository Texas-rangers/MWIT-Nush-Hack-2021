<template>
    <v-container class = "px-10 pb-10" style="width: 80%; max-width: 800px;">
    <v-row justify="center">
        <v-col cols="6">
            <v-date-picker
            v-model="BookDate"
            class="mt-7 elevation-1"        
            ></v-date-picker>
        </v-col>
        <v-col cols="6" class = "pt-3" style = "justify-content: center; align-items: center;">
            <v-row align = "center" class = "mt-5">
                <v-col cols = "9">
                <v-select
                    v-model="select"
                    :items="this.shop.Interval"
                    :item-text = "item => item.startTime +' - '+ item.finishTime"
                    item-value = "item => item.startTime +' - '+ item.finishTime"
                    label="Select"
                    
                    single-line
                ></v-select>
                </v-col>
                <v-col cols = "3">
                <v-btn @click="refreshCurrentCustomer()"> Check</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-card 
                    class = "ml-4 py-5" 
                    v-if="this.Bad" 
                    style = "width: 100%; font-size: 25px;"
                    color = "red lighten-4"
                >
                    Not Available :(
                </v-card>
                <v-card 
                    v-else 
                    style = "width: 100%; text-align: center; font-size: 25px; line-height: 2;" 
                    class = "ml-4 pt-5"
                    color = "green lighten-4"
                >
                    <b>Available Slot(s):</b><br>
                    <p style = "font-size: 40px;">{{this.Available}}</p>
                </v-card>
            </v-row>
            <v-row class = "ml-1 mt-9">
                <v-btn v-show="this.Available > 0 && !this.Duplicated && this.BookDate" 
                    color = "blue accent-2"
                    block
                    dark
                    @click = "AddBook()"
                >
                    Add queue
                </v-btn>
            </v-row>
        </v-col>
    </v-row>
    
    </v-container>
</template>
<script>
import {RTDB} from "@/firebase";
  export default {
    name: 'IntervalSelect',
    props : [
        "shop",
        "load",
        "user",
        "useruid",
        "owneruid",
        "shopuid",
        ],
    data(){
        return{
            book: "",
            CurrentCustomer: "",
            StDate: new Date(),
            FnDate: new Date(new Date().getTime()+(7*24*60*60*1000)),
            loading: "",
            cur_shop: this.shop,
            cur_load: this.load,
            cur_user: this.user,
            cur_useruid: this.useruid,
            cur_shopuid: this.shopuid,
            cur_owneruid: this.owneruid,
            BookDate: "",
            select: "",
            time_select: [],
            Available: 0,
            Duplicated: false,
            availcol: ['green lighten-4', 'amber lighten-4'],
            Bad: true
        }
    },
    methods:{
        AddBook(){
            var q = {} // Haven't visited, Haven't leaved, Visited and leaved;
            q[this.user + ""] = "Haven't visited";
            const Path = this.BookDate + " " + this.select
            const ShopPath = "shop/" + this.owneruid + "/" + this.shopuid + "/Queue/" + Path 
            const CusPath = "customer/" + this.useruid + "/Queue/" + Path
            RTDB.ref(ShopPath).update({ ...q})
            RTDB.ref(CusPath).update({ShopUID:this.shopuid,PlaceName:this.shop.PlaceName,...q})
            alert("Successfully add to your queue, Going back to home page")
            this.$router.push({name: "Home"})
        },
        refreshCurrentCustomer(){
            const dateinfo = this.BookDate + " " + this.select
            this.Duplicated = false;
            var foo = false;
            var foo2 = false;
            for(const key in this.shop.Queue){
                if(key == dateinfo){
                    foo = true;
                    for(const key2 in this.shop.Queue[dateinfo]){
                        if(key2 == this.cur_user){
                            foo2 = true;
            }}}}
            if(!foo){
                this.CurrentCustomer = 0
            }else{
                this.CurrentCustomer = Object.keys(this.shop.Queue[dateinfo]).length
                if(foo2){
                    this.Duplicated = true;
                }
            }
            console.log(this.shop.PlaceName)
            this.Available = Number(this.shop.MaxCustomer) - this.CurrentCustomer
            if(this.Available == 0 || !this.BookDate || !this.select){
                this.Bad = true;
            }else{
                this.Bad = false;
            }
        }
    }
  }
</script>