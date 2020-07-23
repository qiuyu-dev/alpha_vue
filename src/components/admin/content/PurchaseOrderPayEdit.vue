<template>
  <div style="text-align: left">
    <!-- <el-button class="add-button" @click="dialogFormVisible = true">付费</el-button> -->
    <el-dialog
      title="采购单"
      :visible.sync="dialogFormVisible"
      @close="clear">
      
      <el-form :model="purchaseOrderPayForm" style="text-align: left" ref="purchaseOrderPayForm">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="服务批次" :label-width="formLabelWidth" prop="batchNumber">
              <el-input v-model="objData.batchNumber" autocomplete="off" placeholder="服务批次" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="服务商" :label-width="formLabelWidth" prop="cname">
              <el-input v-model="objData.cname" autocomplete="off" placeholder="服务商" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="有效客户数" :label-width="formLabelWidth" prop="effectiveNumber">
              <el-input v-model="msg.length" placeholder="有效客户数" autocomplete="off" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务总单价" :label-width="formLabelWidth" prop="price">
              <el-input v-model="purchaseOrderPayForm.price" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="预付款" :label-width="formLabelWidth" prop="prepayment">
              <el-input v-model="purchaseOrderPayForm.prepayment" autocomplete="off"></el-input>
            </el-form-item>
           </el-col>
        </el-row>
        <el-row :gutter="10">
           <el-col :span="12">
              <el-form-item label="开始日期" :label-width="formLabelWidth" required>
              <el-form-item prop="beginTime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.beginTime" value-format="yyyy-MM-dd" style="width: 65%;"></el-date-picker>
              </el-form-item>
              </el-form-item>
           </el-col>
           <el-col :span="12">
              <el-form-item label="结束日期" :label-width="formLabelWidth" required>
              <el-form-item prop="endTime">
                  <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.endTime" value-format="yyyy-MM-dd" style="width: 65%;"></el-date-picker>
              </el-form-item>
              </el-form-item>
           </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="付费日期" :label-width="formLabelWidth" required>
            <el-form-item prop="payTime">
                <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderPayForm.payTime" value-format="yyyy-MM-dd" style="width: 65%;"></el-date-picker>
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="付费凭证" :label-width="formLabelWidth" prop="payImg">
              <el-input v-model="purchaseOrderPayForm.payImg" autocomplete="off" placeholder="图片 URL"></el-input>
              <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
            </el-form-item>
          </el-col>          
        </el-row> 
        <el-row>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
           <el-input v-model="purchaseOrderPayForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        </el-row>             
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>        
        <el-button type="primary" @click="onSubmit(purchaseOrderPayForm)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './ImgUpload'
  export default {
    name: 'purchaseOrderPayEdit',
    props: ['msg'],
    components: {ImgUpload},
    objData: {},
    num: '',
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        purchaseOrderPayForm: {
          id: '',
          batchNumber: '',
          cname: '',
          effectiveNumber: '',
          price: '',
          prepayment: '',
          beginTime: '',
          endTime: '',
          payTime: '',
          remark: '',
          payImg: ''          
        },        
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
          beginTime: '',
          endTime: '',
          payTime: '',
          remark: '',
          payImg: ''          
        }
        this.$refs.purchaseOrderPayForm.resetFields()
        this.msg=''
      },
      onSubmit (purchaseOrderPayForm) {
        this.$axios.post('/admin/content/purchaseorder/pay', {
                batchNumber: this.objData.batchNumber,
                cid: this.objData.cid,
                effectiveNumber: this.msg.length,
                ids: this.msg + '',
                price: this.purchaseOrderPayForm.price,
                prepayment: this.purchaseOrderPayForm.prepayment,
                beginTime: this.purchaseOrderPayForm.beginTime,
                endTime: this.purchaseOrderPayForm.endTime,
                payTime: this.purchaseOrderPayForm.payTime,
                remark: this.purchaseOrderPayForm.remark,
                payImg: this.purchaseOrderPayForm.payImg              
              }).then(resp => {
                if (resp && resp.data.code === 200) {
                  this.dialogFormVisible = false
                  this.$emit('onSubmit')
                }
            })
          
        
      },
      uploadImg () {
        this.purchaseOrderPayForm.payImg = this.$refs.imgUpload.url
      },
      getData () {
        let _this = this
        this.$axios.get('/admin/content/purchaseorderpay/batchfeeData').then(resp => {
            if (resp && resp.data.code === 200) {
              _this.objData = resp.data.result
              console.log(_this.objData)

            }
          }).catch((error) =>{
            console.log(error)
          })  
      }
    },
    created () {
      
    },
    mounted () {
      this.getData()
      this.num = this.msg.length
      console.log('num',this.num)
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
