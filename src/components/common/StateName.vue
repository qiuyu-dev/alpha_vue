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
      id: this.sid
    }
  },
  methods: {
    getStateName () {
    // public static final String STATUS1 = "已触发待申请";//客户-采购方
    // public static final String STATUS2 = "重新触发待申请";//客户-采购方
    // public static final String STATUS_3 = "申请未通过";//客户或采购方-服务方
    // public static final String STATUS3 = "已申请待审核";//客户或采购方-服务方
    // public static final String STATUS4 = "重新申请待审核";//客户或采购方-服务方
    // public static final String STATUS_5 = "审核未通过";//服务方-客户或采购方
    // public static final String STATUS5 = "审核通过可付费";//服务方-客户或采购方
    // public static final String STATUS6 = "付费完成待收款";//客户或采购方-服务方
    // public static final String STATUS_7 = "未收款";//服务方-客户或采购方
    // public static final String STATUS7 = "确认收款服务中";//服务方-客户或采购方
    // public static final String STATUS8 = "服务完成";//服务方-客户或采购方
    // public static final String STATUS9 = "服务完成且评价";//服务方-客户或采购方
      let sid = this.sid + ''
      switch (sid) {
        case '1':
          this.name = '已触发待申请'
          break
        case '2':
          this.name = '重新触发待申请'
          break
        case '3':
          this.name = '待审核'
          break
        case '4':
          this.name = '修改待审核'
          break
        case '5':
          this.name = '审核通过可付费'
          break
        case '6':
          this.name = '付费完成待收款'
          break
        case '7':
          this.name = '确认收款服务中'
          break
        case '8':
          this.name = '服务完成'
          break
        case '9':
          this.name = '服务完成且评价'
          break
        default:
          this.name = 'other'
          break
      }
    }
  },
  mounted: function () {
    console.log(this.id)
    this.getStateName()
  },
  props: {
    sid: String,
    required: true
  }
}
</script>

<style scoped>
.div-inline{ display:inline} 

</style>
