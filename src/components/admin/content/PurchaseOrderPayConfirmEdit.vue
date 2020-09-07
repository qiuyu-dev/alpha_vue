<template>
  <div style="text-align: left">
    <el-dialog title="收款确认" :visible.sync="dialogFormVisible" @close="clear">
      <el-form
        :model="purchaseOrderPayConfirmForm"
        style="text-align: left"
        ref="purchaseOrderPayConfirmForm"
        :rules="rules"
      >
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="服务批次：" :label-width="formLabelWidth" prop="batchNumber">
              <label>{{purchaseOrderPayConfirmForm.batchNumber}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户数：" :label-width="formLabelWidth" prop="effectiveNumber">
              <label>{{purchaseOrderPayConfirmForm.effectiveNumber}}</label>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="6">
            <el-form-item label="总单价：" :label-width="formLabelWidth" prop="price">
              <label>{{purchaseOrderPayConfirmForm.price}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="预付款：" :label-width="formLabelWidth" prop="prepayment">
              <label>{{purchaseOrderPayConfirmForm.prepayment}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="应收款：" :label-width="formLabelWidth" prop="receivable">
              <el-input v-model="purchaseOrderPayConfirmForm.receivable" autocomplete="off"  placeholder="应收款"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="8">
            <el-form-item label="开始日：" :label-width="formLabelWidth">
              <el-form-item prop="effectiveDate">
                <label>{{purchaseOrderPayConfirmForm.effectiveDate|dateformat('YYYY-MM-DD')}}</label>
、              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="结束日：" :label-width="formLabelWidth">
              <el-form-item prop="closingDate">
                <label>{{purchaseOrderPayConfirmForm.closingDate|dateformat('YYYY-MM-DD')}}</label>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="1">
          <el-col :span="24">
            <el-form-item label="付费凭证：" prop="url">
               <el-image :src="purchaseOrderPayConfirmForm.url" style="width: 20%;">
                 </el-image>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row :gutter="1">
          <el-form-item label="操作" :label-width="formLabelWidth" prop="opt">
            <el-select class="select" v-model="purchaseOrderPayConfirmForm.opt" placeholder="请选择操作" disabled>
              <el-option label="收款" value="1"></el-option>
              <el-option label="驳回" value="2"></el-option>
            </el-select>
          </el-form-item>
           </el-row>
        <el-row :gutter="1">
          <el-col :span="10">
            <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
              <label>{{purchaseOrderPayConfirmForm.remark}}</label>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收款备注：" :label-width="formLabelWidth" prop="confirmRemark">
              <el-input v-model="purchaseOrderPayConfirmForm.confirmRemark" autocomplete="off"  placeholder="收款备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import { isBtnZero } from '@/utils/validate.js'

export default {
  name: 'purchaseOrderPayConfirmEdit',
  props: ['msg'],
  components: { ImgUpload },
  objData: {},
  num: '',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '90px',
      formLabelWidth2: '80px',
      rules: {
        receivable: [
        //   { required: true, message: '请输入应收款', trigger: 'blur' },
          {
            validator: isBtnZero,
            triger: 'blur'
          }
        ]
      },
      purchaseOrderPayConfirmForm: {
        id: '',
        batchNumber: '',
        cname: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        receivable: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
        remark: '',
        url: '',
        img: '',
        confirmRemark: ''
      }
    }
  },
  methods: {
    clear () {
      this.purchaseOrderPayConfirmForm = {
        id: '',
        batchNumber: '',
        name: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        receivable: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
        remark: '',
        img: '',
        url: '',
        confirmRemark: ''
      }
      this.$refs.purchaseOrderPayConfirmForm.resetFields()
    },
    onSubmit () {
      if (
        this.purchaseOrderPayConfirmForm.opt === '1' && (this.purchaseOrderPayConfirmForm.receivable == null ||
        this.purchaseOrderPayConfirmForm.receivable === 0)
      ) {
        this.$alert('请输入应收款', '提示', {
          confirmButtonText: '确定'
        })
        return
      }
      this.$axios
        .post('/admin/v1/pri/batchFee/payconfirm', {
          id: this.purchaseOrderPayConfirmForm.id,
          receivable: this.purchaseOrderPayConfirmForm.receivable,
          confirmRemark: this.purchaseOrderPayConfirmForm.confirmRemark,
          opt: this.purchaseOrderPayConfirmForm.opt
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    },
    uploadImg () {
      this.purchaseOrderPayConfirmForm.payImg = this.$refs.imgUpload.url
    }
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

img {
  width: 150px;
  height: 100px;
}
</style>
