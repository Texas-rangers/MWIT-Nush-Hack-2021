<template>
  <v-app>
    <Appbar/>
    <!-- <IntervalSelect/> -->
    {{this.ShopID}}
  </v-app>
</template>

<script>
import {RTDB} from "@/firebase";
import Appbar from "@/components/Appbar"
// import IntervalSelect from "@/components/IntervalSelect"

  export default {
    name: 'Book',

    components: {
      Appbar,
      // IntervalSelect,
    },
    data(){
        return{
            ShopUID: "",
            Shop: [],
        }
    },
    methods: {

    },
    async created(){
        this.ShopUID = this.$route.query.uid;
        await RTDB.ref(`shop`).once('value', snapshot => {
            const data = snapshot.val();
            Object.keys(data).forEach(key => {
                const InnerObj = data[key]
                Object.keys(InnerObj).forEach(key2 =>{
                    if(key2 == this.ShopUID){
                      var DD = [];
                      DD.push({id:key2, ...InnerObj[key2]});
                      this.Shop = DD[0];
                    }
                })
            })
        })
        console.log(this.ShopUID)
        console.log(this.Shop)
    },
  }
</script>