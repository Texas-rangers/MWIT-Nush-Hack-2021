<template>
    <v-card
        class="mx-auto"
        max-width="500"
    >
        <v-list>
            <v-list-item-group v-model="model">
                <v-list-item
                    v-for="(slot, i) in timeSlot"
                    :key="i"
                    :color = "updateColor(slot)"
                    @click = "getColor(slot)"
                    >
                    <v-list-item-content>
                        <v-list-item-title 
                            v-text="slot.remain"
                        >
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>
<script>
export default {
    data(){
        return{
            timeSlot: [{staus : "", remain : 5}],//status, remain
            remainSlot: 0
        }
    },
    name: "timeTable",
    methods:{
        getColor(e){
            if(e.status == "selected"){
                e.status = "";
                this.remainSlot++;
                e.remain++;
                return "green";
            }else{
                e.status = "selected";
                this.remainSlot--;
                e.remain--;
                return "blue";//selected
            }
        }
    },
    computed:{
        updateColor(e){
            if(this.remainSlot <= 0 && e.status != "selected"){
                return "grey";//unavailable
            }else if(this.remainSlot > 0 && e.status != "selected"){
                return "green";//available
            }
            return "grey"
        }
    }
}
</script>