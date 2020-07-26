<template>
  <div style="text-align: left">
    <!-- <el-button class="add-button" @click="dialogFormVisible = true">付费确认</el-button> -->
    <el-dialog
      title="收款确认"
      :visible.sync="dialogFormVisible"
      @close="clear">
      
      <el-form :model="purchaseOrderPayConfirmForm" style="text-align: left" ref="purchaseOrderPayConfirmForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="服务批次" :label-width="formLabelWidth" prop="batchNumber">
              <el-input v-model="purchaseOrderPayConfirmForm.batchNumber" autocomplete="off" placeholder="服务批次" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务商" :label-width="formLabelWidth" prop="payId">
              <el-input v-model="purchaseOrderPayConfirmForm.payId" autocomplete="off" placeholder="服务商" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="有效客户数" :label-width="formLabelWidth" prop="effectiveNumber">
              <el-input v-model="purchaseOrderPayConfirmForm.effectiveNumber" placeholder="有效客户数" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务总单价" :label-width="formLabelWidth" prop="price">
              <el-input v-model="purchaseOrderPayConfirmForm.price" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="预付款" :label-width="formLabelWidth" prop="prepayment">
              <el-input v-model="purchaseOrderPayConfirmForm.prepayment" autocomplete="off" disabled></el-input>
            </el-form-item>
           </el-col>
        </el-row>
        <el-row :gutter="10">
           <el-col :span="8">
              <el-form-item label="开始日期" :label-width="formLabelWidth">
              <el-form-item prop="effectiveDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayConfirmForm.effectiveDate" value-format="yyyy-MM-dd" style="width: 135px" disabled></el-date-picker>
              </el-form-item>
              </el-form-item>
           </el-col>
           <el-col :span="8">
              <el-form-item label="结束日期" :label-width="formLabelWidth">
              <el-form-item prop="closingDate">
                  <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayConfirmForm.closingDate" value-format="yyyy-MM-dd" style="width: 135px" disabled></el-date-picker>
              </el-form-item>
              </el-form-item>
           </el-col>
           <el-col :span="8">
             <el-form-item label="应收款" :label-width="formLabelWidth" prop="receivable" required>
              <el-input v-model="purchaseOrderPayConfirmForm.receivable" autocomplete="off" ></el-input>
             </el-form-item> 
           </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="付费日期" :label-width="formLabelWidth">
            <el-form-item prop="payTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayConfirmForm.payTime" value-format="yyyy-MM-dd" style="width: 135px" disabled></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付费凭证" :label-width="formLabelWidth2" prop="payImg">
              <el-input v-model="purchaseOrderPayConfirmForm.payImg" autocomplete="off" placeholder="图片 URL" style="width: 230px" readonly></el-input>
              <!-- <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload> -->
            </el-form-item>
          </el-col>          
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
            <el-input v-model="purchaseOrderPayConfirmForm.remark" autocomplete="off" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="确认备注" :label-width="formLabelWidth" prop="confirmRemark">
            <el-input v-model="purchaseOrderPayConfirmForm.confirmRemark" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>  
        </el-row>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderPayConfirmForm.id" autocomplete="off"></el-input>
        </el-form-item>                                  
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>        
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
  export default {
    name: 'purchaseOrderPayConfirmEdit',
    props: ['msg'],
    components: {ImgUpload},
    objData: {},
    num: '',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '90px',
        formLabelWidth2: '80px',
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
          payImg: '',
          confirmRemark: ''          
        },        
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
          payImg: '',
          confirmRemark: ''          
        }
        this.$refs.purchaseOrderPayConfirmForm.resetFields()        
      },
      onSubmit () {
        if(this.purchaseOrderPayConfirmForm.receivable == null||this.purchaseOrderPayConfirmForm.receivable == 0){
          this.$alert("请输入应收款", '提示', {
                  confirmButtonText: '确定'
                })
          return 
        }
        //alert(this.purchaseOrderPayConfirmForm.id +"/" + this.purchaseOrderPayConfirmForm.receivable + "/" +this.purchaseOrderPayConfirmForm.confirmRemark)
        this.$axios.post('/admin/v1/pri/po/section/purchaseorder/payconfirm', {
                id: this.purchaseOrderPayConfirmForm.id,
                receivable: this.purchaseOrderPayConfirmForm.receivable,
                confirmRemark: this.purchaseOrderPayConfirmForm.confirmRemark           
              }).then(resp => {
                if (resp && resp.data.code === 200) {
                  this.dialogFormVisible = false
                  this.$emit('onSubmit')
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
</style>
