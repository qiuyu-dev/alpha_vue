<template>
    <div  class="div-inline">
        {{name}}
    </div>
</template>
<script>
export default {
  data () {
    return {
      name: null,
      id: this.pid
    }
  },
  methods: {
    getProductName () {
      // 通过用户id查找产品名称
      let pid = this.pid
                this.$axios.get('/admin/v1/pub/product/getNameById', {
                     params:{
                         id: pid + ''
                     }                  
                  }).then(resp => {
                    if (resp && resp.data.code === 200) {
                         //console.log(resp.data.result)
                         this.name = resp.data.result.name
                    }else {
                       console.log(resp.data.message)
          // this.$alert(resp.data.message)
        }
                })
    }
  },
  mounted: function () {
    console.log(this.id)
    this.getProductName()
  },
  props: {
    pid: String,
    required: true
  }
}
</script>

<style scoped>
.div-inline{ display:inline} 

</style>
