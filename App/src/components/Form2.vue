<template>
    <v-card
        color = "transparent"
        style = "width: 80%;"
        max-width = "500"
    >
        <v-form  class="form" @submit="onSubmit" ref="form" v-model="valid" lazy-validation>
            <v-container
                justify = "center"
            >
                <v-row>
                    <v-text-field
                        label = "Username"
                        :rules="UserRules"
                        type = "text"
                        v-model ="Username"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Password"
                        type = "password"
                        v-model ="Password"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "RePassword"
                        type = "password"
                        v-model ="RePassword"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "PlaceName"
                        type = "text"
                        v-model ="PlaceName"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Location"
                        type = "text"
                        v-model ="Location"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Description"
                        type = "text"
                        v-model ="Description"
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "OwnerName"
                        type = "text"
                        v-model ="OwnerName"
                        required
                    ></v-text-field>
                </v-row>
                <v-row>
                    <v-text-field
                        label = "Phone"
                        type = "text"
                        v-model ="Phone"
                        required
                    ></v-text-field>
                </v-row>
                <v-row justify = "center" style = "height : 60px;">
                    <v-btn 
                        type = "submit"
                        dark
                        rounded
                        block
                    >REGISTER</v-btn>
                </v-row>
            </v-container>
        </v-form>
    </v-card>
</template>

<script>

  export default {
    name: 'Form',
    data(){
        return{
            Username: "",
            UserRules: [
                v => !!v || 'Name is required',
                v => (v && v.length <= 10) || 'Name must be less than 10 characters',
            ],
            Password: "",
            RePassword: "",
            PlaceName: "",
            Location: "",
            Description: "",
            OwnerName: "",
            Phone: "",
        }
    },
    methods:{
        onSubmit(e) {
            this.$refs.form.validate();
            e.preventDefault();
            if(this.Password != this.RePassword){
                alert("Two passwords don't match each other");
                return;
            }
            const request = {
                Username: this.Username,
                Password: this.Password,
                RePassword: this.RePassword,
                PlaceName: this.PlaceName,
                Location: this.Location,
                Description: this.Description,
                OwnerName: this.OwnerName,
                Phone: this.Phone,
            }
            this.$emit('login-request', request);
            console.log("fuck");
        }
    }
  }
</script>