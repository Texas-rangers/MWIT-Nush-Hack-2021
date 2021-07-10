<template>
  <vue-qrcode value= website />
</template>
<script>
import VueQrcode from 'vue-qrcode'

export default {
    name: "QrCode",
    data(){
        return{
            website = ""
        }
    },
    components: {
        VueQrcode,
    },
}
</script>