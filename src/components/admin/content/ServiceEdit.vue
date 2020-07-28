<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">添加服务</el-button>
    <el-dialog
      title="添加服务"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="serviceForm" :rules="rules" label-position="left"
               label-width="0px">
        <el-form-item prop="recordNumber">
          <el-input type="text" v-model="serviceForm.recordNumber"
                    auto-complete="off" placeholder="备案编号"></el-input>
        </el-form-item>
        <el-form-item prop="product">
          <el-input type="text" v-model="serviceForm.product"
                    auto-complete="off" placeholder="产品全称"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="addservice">添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ServiceEdit',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        recordNumber: [{required: true, message: '备案编号不能为空', trigger: 'blur'}],
        product: [{required: true, message: '产品全称不能为空', trigger: 'blur'}]
      },
      serviceForm: {
        recordNumber: '',
        product: ''
      }
    }
  },
  methods: {
    clear () {
      this.serviceForm = {
        recordNumber: '',
        product: ''
      }
    },
    addservice () {
      this.$axios
        .post('/admin/v1/pri/sc/section/save/service', {
          recordNumber: this.serviceForm.recordNumber,
          product: this.serviceForm.product

        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('添加成功', '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
    }
  }
}
</script>

<style scoped>
  .add-button {
    margin: 0px 10 0 10px;
  }
</style>
