<template>
  <div style="text-align: left">
    <!-- <el-button class="add-button" @click="dialogFormVisible = true">付费</el-button> -->
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
          <!-- <el-col :span="12">
            <el-form-item label="服务商" :label-width="formLabelWidth" prop="cname">
              <el-input v-model="objData.cname" autocomplete="off" placeholder="服务商" disabled></el-input>
            </el-form-item>
          </el-col>-->
        </el-row>
        <el-row :gutter="1">
          <el-col :span="12">
            <el-form-item label="服务总单价" :label-width="formLabelWidth" prop="price">
              <!-- <el-input
                v-model="purchaseOrderPayForm.price"
                autocomplete="off"
                style="width: 90%"
                placeholder="单价"
              ></el-input> -->
              <el-input  v-model="purchaseOrderPayForm.price" 
              placeholder="服务总单价" autocomplete="off"
                style="width: 90%"></el-input>         
                <!-- <el-input-number :min="0" :precision="2" :controls="false"
                      v-model="purchaseOrderPayForm.price" type="number" style="width: 90%" placeholder="服务总单价">
                </el-input-number>  -->
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
          <!-- <el-col :span="12">
            <el-form-item label="付费日期" :label-width="formLabelWidth" required>
            <el-form-item prop="payTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.payTime" value-format="yyyy-MM-dd" style="width: 65%;"></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>-->
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
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="onSubmit(purchaseOrderPayForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
import { isInteger ,isBtnZero} from '@/utils/validate.js'

export default {
  name: 'purchaseOrderPayEdit',
  props: ['msg', 'rToId'],
  components: { ImgUpload },
  objData: {},
  num: '',
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      rules: {
        price: [
          { required: true, message: '请输入单价', trigger: 'blur' }
          ,
          {
            validator: isBtnZero,
            triger: 'blur'
          }
        ],
        prepayment: [
          { required: true, message: '请输入预付款', trigger: 'blur' },
          {validator: isBtnZero, triger: 'blur'}
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
        cname: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
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
        name: '',
        effectiveNumber: '',
        price: '',
        prepayment: '',
        effectiveDate: '',
        closingDate: '',
        payTime: '',
        remark: '',
        payImg: ''
      }
      this.$refs.purchaseOrderPayForm.resetFields()
      this.msg = ''
      this.rToId = ''
    },
    onSubmit (purchaseOrderPayForm) {
      this.$axios
        .post('/admin/v1/pri/batchFee/pay', {
          batchNumber: this.objData.batchNumber,
          // cid: this.objData.cid,
          effectiveNumber: this.msg.length,
          ids: this.msg + '',
          price: this.purchaseOrderPayForm.price,
          prepayment: this.purchaseOrderPayForm.prepayment,
          effectiveDate: this.purchaseOrderPayForm.effectiveDate,
          closingDate: this.purchaseOrderPayForm.closingDate,
          // payTime: this.purchaseOrderPayForm.payTime,
          remark: this.purchaseOrderPayForm.remark,
          payImg: this.purchaseOrderPayForm.payImg //,
          // toId : this.rToId
        })
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            this.dialogFormVisible = false
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message)
          }
        })
    },
    uploadImg () {
      this.purchaseOrderPayForm.payImg = this.$refs.imgUpload.url
    },
    getData () {
      let _this = this
      this.$axios
        .get('/admin/v1/pri/batchFee/BatchFeeMstData')
        .then((resp) => {
          if (resp && resp.data.code === 200) {
            _this.objData = resp.data.result
            console.log(_this.objData)
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
    console.log('num', this.num)
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
