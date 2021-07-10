<template>
    <v-card
        style = "width: 80%;"
        max-width = "500"
        class = "rounded-xl px-6 py-4"
    >
        <v-form  class="form" @submit="onSubmit" ref="form" lazy-validation>
            <v-container
                justify = "center"
            >
                <v-row justify = "center" style = "font-size: 40px;" class = "font-weight-bold">Register new shop</v-row>
                <v-row>
                    <v-text-field
                        label = "PlaceName"
                        type = "text"
                        v-model ="PlaceName"
                        required
                        prepend-icon="mdi-rename-box"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Location"
                        type = "text"
                        v-model ="Location"
                        required
                        prepend-icon="mdi-map-marker"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Description"
                        type = "text"
                        v-model ="Description"
                        prepend-icon="mdi-clipboard-text"
                        counter="80"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "OwnerName"
                        type = "text"
                        v-model ="OwnerName"
                        required
                        prepend-icon="mdi-account"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Phone"
                        type = "text"
                        v-model ="Phone"
                        :Rules = "phoneRules"
                        required
                        prepend-icon="mdi-phone"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "MaxCustomer"
                        type = "number"
                        v-model ="MaxCustomer"
                        required
                        prepend-icon="mdi-account-group"
                    ></v-text-field>
                </v-row>
                <v-list>
                    <v-list-item-group>
                        <v-list-item
                            v-for="(item, i) in Interval"
                            :key="i"
                            >
                            <v-list-item-content
                                @click = "deleteInterval(i)"
                            >
                                <v-list-item-title 
                                    v-text="item.startTime + ' - ' + item.finishTime">
                                </v-list-item-title>
                                <v-list-item-subtitle 
                                    v-text= "i+1" >
                                </v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-row>
                    <v-col cols = "5">
                        <v-menu
                            ref="menu1"
                            v-model="menuStart"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="startTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="startTime"
                                label="Start Time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="menuStart"
                            v-model="startTime"
                            full-width
                            @click:minute="$refs.menu1.save(startTime)"
                            ></v-time-picker>
                        </v-menu>
                    </v-col>

                    <v-col cols = "5">
                        <v-menu
                            ref="menu2"
                            v-model="menuFinish"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="finishTime"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="finishTime"
                                label="Finish Time"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-time-picker
                            v-if="menuFinish"
                            v-model="finishTime"
                            full-width
                            @click:minute="$refs.menu2.save(finishTime)"
                            ></v-time-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols = "2" align = "center" class = "pt-6">
                        <v-btn
                            @click = "addNewInterval"
                            class = "elevation-2"
                        >
                            Add
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row justify = "center" class = "py-3">
                    <v-btn 
                        type = "submit"
                        dark
                        rounded
                        block
                    >REGISTER SHOP</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>

  export default {
    name: 'FormShopRegister',
    data(){
        return{
            startTime: null,
            finishTime: null,
            menuStart: false,
            menuFinish: false,
            PlaceName: "",
            Location: "",
            Description: "",
            OwnerName: "",
            Phone: "",
            MaxCustomer: "",
            Interval: [] //startTime, finishTime
        }
    },
    methods:{
        onSubmit(e) {
            this.$refs.form.validate();
            e.preventDefault();
            const request = {
                PlaceName: this.PlaceName,
                Location: this.Location,
                Description: this.Description,
                OwnerName: this.OwnerName,
                Phone: this.Phone,
                MaxCustomer: this.MaxCustomer,
                Interval: this.Interval,
                Queue: [],
            }
            this.$emit('login-request', request);
            console.log("fuck");
            this.$router.push({name: "Home"})
        },
        addNewInterval(){
            if(this.startTime == "" || this.finishTime == "")return 0;
            this.Interval.push({
                startTime : this.startTime, 
                finishTime : this.finishTime,
                clients : [] 
            })
            this.startTime = ""
            this.finishTime = ""
        },
        deleteInterval(inp){
            if(confirm("Delete this interval?")){
                this.Interval.splice(inp,1)
            }
        }
    },
    computed:{
        detailRules(){
            const detailRules = [
                v => !!v|| "Detail is required"
            ]
            return detailRules;
        },
        phoneRules(){
            const phoneRules = [
                v => (v.length < 9 || v.length > 10) || "Phone need contain 9 - 10 digits ",
                v => /^\d+$/.test(v) || "Phone is invalid ",
            ]
            return phoneRules;
        }
    }
  }
</script>