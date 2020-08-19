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
      id: this.tid
    }
  },
  methods: {
    getTypeName () {
    // 证件类型,1、身份证，2、军官证,3,驾驶证，4、新生儿出生证明，5、社会保险卡号，,10企业机构代码，
      let tid = this.tid + ''
      switch (tid) {
        case '1':
          this.name = '身份证'
          break
        case '2':
          this.name = '军官证'
          break
        case '3':
          this.name = '驾驶证'
          break
        case '4':
          this.name = '出生证明'
          break
        case '5':
          this.name = '社保卡'
          break
        case '10':
          this.name = '企业机构代码'
          break
        default:
          this.name = tid
          break
      }
    }
  },
  mounted: function () {
    console.log(this.id)
    this.getTypeName()
  },
  props: {
    tid: String,
    required: true
  }
}
</script>

<style scoped>
.div-inline{ display:inline} 

</style>
