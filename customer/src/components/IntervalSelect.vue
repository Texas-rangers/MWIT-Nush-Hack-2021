<template>
  <v-container fluid>
    <v-row align="center">
        <v-col cols="6">
            <v-select
            v-model="select"
            :items="this.shop.Interval"
            item-text = "startTime + ' : ' + finishTime"
            item-value = "startTime + ' - ' + finishTime"
            label="Select"
            return-object
            single-line
            ></v-select>
        </v-col>
        <v-col cols="6">
                <v-chip
                    class="ma-2"
                    :color="ColorText()"
                    text-color="white"
                >
                <div v-if = "!booked">
                    <v-avatar
                        left
                        class="green darken-4"
                    >
                        {{shop.MaxCustomer - CurrentCustomer}}
                    </v-avatar>
                </div>
                    {{Remains}}
                </v-chip>
        </v-col>
        <v-col cols = 2>
            <v-btn
                elevation="3"
                rounded
                :color = "getColor()"
                :loading = "loading"
            >
                <v-icon dark>
                    mdi-plus
                </v-icon>
            </v-btn>
        </v-col>
    </v-row>
  </v-container>
</template>
<script>
  export default {
    name: 'IntervalSelect',
    data(){
        return{
            booked: "",
            CurrentCustomer: "",
            loading = "",
            CurrentCustomer = "",
            shop = []
        }
    },
    methods:{
        RemoveBook(e){
            booked = "";
            loading = true;
            //send to database
        },
        AddBood(e){
            booked = "booked"
            loading = true;
            //send to database
        }
    },
    computed:{
        getColor(){
            if(this.loading){
                return "grey"
            }
            if(this.booked){
                return "red"
            }else return "green"
        },
        ColorText(){
            if(this.loading)return "grey";
            if(this.booked) return "blue";
            if(shop.MaxCustomer - this.CurrentCustomer <= 0)return "red";
            return "green";
        },
        Remains : function(){
            if(this.loading)return "loading";
            if(this.booked)return "Already booked";
            if(shop.MaxCustomer - this.CurrentCustomer <= 0)return "Full";
            return "Remains";
        }
    }
  }
</script>