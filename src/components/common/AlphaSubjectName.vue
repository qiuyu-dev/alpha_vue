<template>
    <div class="div-inline">
        {{name}}
    </div>
</template>

<script>
export default {
  data () {
    return {
      name: null,
      id: this.asid
    }
  },
  methods: {
    getSubjectName () {
      // 通过用户id查找用户名称
      let asid = this.asid
      this.$axios.get('/admin/v1/pub/alphaSubject/getNameById', {
        params: {
          id: asid + ''
        }
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          // console.log(resp.data.result)
          this.name = resp.data.result.name
        }else {
          console.log(resp.data.message)
          // this.$alert(resp.data.message)
        }
      })
    }
  },
  mounted: function () {
    // console.log(this.id)
    this.getSubjectName()
  },
  props: {
    asid: String,
    required: true
  }
}
</script>

<style scoped>
.div-inline{ display:inline} 

</style>
