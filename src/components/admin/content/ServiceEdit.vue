<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true" type="primary" >批量添加服务</el-button>
    <el-dialog
      title="添加服务"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="30%">
      <el-form :model="serviceForm" :rules="rules" label-position="left"
               label-width="80px">
        <el-form-item prop="recordNumber" label="备案编号">
          <el-input type="text" v-model="serviceForm.recordNumber"
                    auto-complete="off" placeholder="备案编号" ></el-input>
        </el-form-item>
        <el-form-item prop="name" label="服务全称">
          <el-input type="text" v-model="serviceForm.name"
                    auto-complete="off" placeholder="服务全称" ></el-input>
        </el-form-item>
        <!-- <el-form-item style="width: 100%">
          <el-button type="primary"  v-on:click="addservice">确定</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
         <el-button type="primary"  v-on:click="addservice">确定</el-button>
         </div>
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
        recordNumber: [{required: true, message: '请输入备案编号', trigger: 'blur'}],
        name: [{required: true, message: '请输入服务全称', trigger: 'blur'}]
      },
      serviceForm: {
        recordNumber: '',
        name: ''
      }
    }
  },
  methods: {
    clear () {
      this.serviceForm = {
        recordNumber: '',
        name: ''
      }
    },
    addservice () {
      this.$axios
        .post('/admin/v1/pub/product/save', {
          recordNumber: this.serviceForm.recordNumber,
          name: this.serviceForm.name

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
