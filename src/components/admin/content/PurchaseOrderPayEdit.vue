<template>
  <div style="text-align: left">
    <el-dialog title="采购单付费" :visible.sync="dialogFormVisible" @close="clear">
      <el-form
        :model="purchaseOrderPayForm"
        :rules="rules"
        style="text-align: left"
        ref="purchaseOrderPayForm"
      >
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="服务批次：" :label-width="formLabelWidth" prop="batchNumber">
              <label>{{objData.batchNumber}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="有效客户数：" :label-width="formLabelWidth" prop="effectiveNumber">
              <label>{{msg.length}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="服务总单价" :label-width="formLabelWidth" prop="price">
              <el-input  v-model="purchaseOrderPayForm.price"
              placeholder="服务总单价" autocomplete="off"
                style="width: 90%"></el-input>
           </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预付款" :label-width="formLabelWidth" prop="prepayment">
              <el-input
                v-model="purchaseOrderPayForm.prepayment"
                autocomplete="off"
                style="width: 90%"
                placeholder="预付款"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="开始日" :label-width="formLabelWidth" required>
              <el-form-item prop="effectiveDate">
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="purchaseOrderPayForm.effectiveDate"
                  value-format="yyyy-MM-dd"
                  style="width: 90%"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="结束日" :label-width="formLabelWidth" required>
              <el-form-item prop="closingDate" >
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="purchaseOrderPayForm.closingDate"
                  value-format="yyyy-MM-dd"
                  style="width: 90%"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
         <el-col :span="16">
            <el-form-item label="付费凭证" :label-width="formLabelWidth" prop="payImg">
              <el-input
                v-model="purchaseOrderPayForm.payImg"
                autocomplete="off"
                placeholder="图片 URL"
              ></el-input>
              <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="16">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
              <el-input v-model="purchaseOrderPayForm.remark" autocomplete="off"  placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit(purchaseOrderPayForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import { isBtnZero } from '@/utils/validate.js'

export default {
  name: 'purchaseOrderPayEdit',
  props: ['msg'],
  components: { ImgUpload },
  objData: {},
  num: '',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' },
          { validator: isBtnZero, triger: 'blur' }
        ],
        prepayment: [
          { required: true, message: '请输入预付款', trigger: 'blur' },
          { validator: isBtnZero, triger: 'blur' }
        ],
        effectiveDate: [
          { required: true, message: '请选择开始日', trigger: 'blur' }
        ],
        closingDate: [
          { required: true, message: '请选择结束日', trigger: 'blur' }
        ]
      },
      purchaseOrderPayForm: {
        id: '',
        batchNumber: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        effectiveDate: '',
        closingDate: '',
        remark: '',
        payImg: ''
      }
    }
  },
  methods: {
    clear () {
      this.purchaseOrderPayForm = {
        id: '',
        batchNumber: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        effectiveDate: '',
        closingDate: '',
        remark: '',
        payImg: ''
      }
      this.objData = ''
      this.getData()
      this.$refs.purchaseOrderPayForm.resetFields()
      this.msg = ''
    },
    onSubmit (purchaseOrderPayForm) {
      this.$refs.purchaseOrderPayForm.validate((valid) => {
        if (valid) {
          this.$axios
            .post('/admin/v1/pri/batchFee/pay', {
              batchNumber: this.objData.batchNumber,
              effectiveNumber: this.msg.length,
              ids: this.msg + '',
              price: this.purchaseOrderPayForm.price,
              prepayment: this.purchaseOrderPayForm.prepayment,
              effectiveDate: this.purchaseOrderPayForm.effectiveDate,
              closingDate: this.purchaseOrderPayForm.closingDate,
              remark: this.purchaseOrderPayForm.remark,
              payImg: this.purchaseOrderPayForm.payImg
            })
            .then((resp) => {
              if (resp && resp.data.code === 200) {
                this.dialogFormVisible = false
                this.$emit('onSubmit')
              } else {
                this.$alert(resp.data.message)
              }
            })
        }
      })
    },
    uploadImg () {
      this.purchaseOrderPayForm.payImg = this.$refs.imgUpload.url
    },
    getData () {
      let _this = this
      this.$axios.get('/admin/v1/pri/batchFee/BatchFeeMstData')
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            _this.objData = resp.data.result
            // console.log(_this.objData)
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {},
  mounted () {
    this.getData()
    this.num = this.msg.length
    // console.log('num', this.num)
  }
}
</script>

<style scoped>
.add-button {
  margin: 0px 10px 0 10px;
}
.select {
  width: 120px;
  margin: 0px 10px 0 0px;
}
</style>
