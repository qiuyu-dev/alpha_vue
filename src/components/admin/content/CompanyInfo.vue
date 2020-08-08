<template>
    <div>
    {{name}}
    </div>
</template>
<script>
    export default {
        props: {
            cid: String,
            required: true
        },
        data() {
            return {
                name: null,
                id: this.cid
            }
        },
        methods: {
            getCompanyName() {
                let cid = this.cid
                this.$axios.get('/admin/v1/pub/company/findById', {
                     params:{
                         id: cid + ''
                     }                  
                  }).then(resp => {
                    if (resp && resp.data.code === 200) {
                         //console.log(resp.data.result)
                         this.name = resp.data.result.name
                    }
                })
            }
        },
        watch: {

        },
        mounted: function () {
            this.getCompanyName();
        }        
    }
</script>

<style scoped>

</style>