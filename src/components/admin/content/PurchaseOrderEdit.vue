<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">复核</el-button>
    <el-dialog
      title="审核采购单"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="purchaseOrderForm" style="text-align: left" ref="purchaseOrderForm">
        <el-row :gutter="10">
          <el-col :span="6">
            <el-form-item label="姓名:" :label-width="formLabelWidth" prop="cname">
              <label>{{purchaseOrderForm.cname}}</label>
             
              <!-- <el-input v-model="purchaseOrderForm.cname" autocomplete="off" readonly disabled></el-input> -->
            </el-form-item>
          </el-col>
         
          <el-col :span="8">
            <el-form-item label="电话：" :label-width="formLabelWidth" prop="phone">
               <label>{{purchaseOrderForm.phone}}</label>
              <!-- <el-input v-model="purchaseOrderForm.phone" autocomplete="off" readonly disabled></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
           <!-- <el-col :span="6">     
            <el-form-item label="证件类型：" :label-width="formLabelWidth" prop="certificateType"> -->
              <!-- <type-name :tid="purchaseOrderForm.certificateType"></type-name> -->
              <!-- <label>{{purchaseOrderForm.certificateType}}</label> -->
            <!-- <el-select class="select" v-model="purchaseOrderForm.certificateType" placeholder="请选择证件类型" disabled>
              <el-option label="身份证" value="1"></el-option>
              <el-option label="护照" value="2"></el-option>
            </el-select> -->
            <!-- </el-form-item>          
          </el-col> -->
          <el-col :span="10">
            <el-form-item label="证件号：" :label-width="formLabelWidth" prop="insuredId">
               <label>{{purchaseOrderForm.insuredId}}</label>
              <!-- <el-input v-model="purchaseOrderForm.insuredId" autocomplete="off" readonly disabled></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="生效日：" :label-width="formLabelWidth">
            <el-form-item prop="effectiveDate">
               <label>{{purchaseOrderForm.effectiveDate|dateformat('YYYY-MM-DD')}}</label>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderForm.effectiveDate" value-format="yyyy-MM-dd" style="width: 75%;" disabled></el-date-picker> -->
            </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="12">  
            <el-form-item label="截止日：" :label-width="formLabelWidth">
            <el-form-item prop="closingDate">
               <label>{{purchaseOrderForm.closingDate|dateformat('YYYY-MM-DD')}}</label>
                <!-- <el-date-picker type="date" placeholder="选择日期" v-model="purchaseOrderForm.closingDate" value-format="yyyy-MM-dd" style="width: 75%;" disabled></el-date-picker> -->
            </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">         
            <el-form-item label="性别：" :label-width="formLabelWidth" prop="sex">
              <label>{{purchaseOrderForm.sex}}</label>
               
            <!-- <el-select class="select" v-model="purchaseOrderForm.sex" placeholder="请选择性别" disabled>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="年龄：" :label-width="formLabelWidth" prop="age">
               <label>{{purchaseOrderForm.age}}</label>
              <!-- <el-input v-model="purchaseOrderForm.age" autocomplete="off" readonly disabled></el-input> -->
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="所在地：" :label-width="formLabelWidth" prop="location">
               <label>{{purchaseOrderForm.location}}</label>
              <!-- <el-input v-model="purchaseOrderForm.location" autocomplete="off" readonly disabled></el-input> -->
            </el-form-item>
          </el-col>        
        </el-row>
        <el-row :gutter="10">
        <el-form-item label="备注：" :label-width="formLabelWidth" prop="remark">
           <label>{{purchaseOrderForm.remark}}</label>
           <!-- <el-input v-model="purchaseOrderForm.remark" autocomplete="off" readonly disabled></el-input> -->
        </el-form-item>
        </el-row>
        <el-row :gutter="10">
            <el-form-item label="操作" :label-width="formLabelWidth" prop="opt">
            <el-select class="select" v-model="purchaseOrderForm.opt" placeholder="请选择操作">
              <el-option label="通过" value="1"></el-option>
              <el-option label="不通过" value="2"></el-option>
            </el-select>
            </el-form-item>       
            <el-form-item label="说明" :label-width="formLabelWidth" prop="reson">
              <el-input v-model="purchaseOrderForm.reson" autocomplete="off"></el-input>
            </el-form-item>
        </el-row>                 
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="eid" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.eid" autocomplete="off"></el-input>
        </el-form-item>          
        <el-form-item prop="fromType" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.fromType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="fromId" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.fromId" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item prop="cpemId" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.cpemId" autocomplete="off"></el-input>
        </el-form-item>    
        <el-form-item prop="cpedId" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.cpedId" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item prop="status" style="height: 0">
          <el-input type="hidden" v-model="purchaseOrderForm.status" autocomplete="off"></el-input>
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
import TypeName from '@/components/common/TypeName.vue'
  export default {
    name: 'PurchaseOrderEdit',
     components: { TypeName},
   
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        purchaseOrderForm: {
          id: '',
          eid: '',          
          cname: '',
          certificateType: '',
          phone: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          status: '',
          fromType: '',
          fromId: '',
          cpemId: '',
          cpedId: '',
          reson: '',
          opt: ''
        }        
      }
    },
    methods: {
      clear () {
        this.purchaseOrderForm = {
          id: '',
          eid: '',          
          cname: '',
          certificateType: '',
          phonenum: '',
          insuredId: '',
          effectiveDate: '',
          closingDate: '',
          sex: '',
          age: '',
          location: '',
          remark: '',
          status: '',
          fromType: '',
          fromId: '',
          cpemId: '',
          cpedId: '',
          reson: '',
          opt: ''
        }
        this.$refs.purchaseOrderForm.resetFields()
      },
      onSubmit () {
        var _id = this.purchaseOrderForm.id
        var _opt = this.purchaseOrderForm.opt
        var _reson = this.purchaseOrderForm.reson
        if (_opt == null) {
          this.$alert("请选择操作", '提示', {
                  confirmButtonText: '确定'
                })
          return 
        }
        
        // alert(_id + "/ "+ _opt + " /" +_reson)
        // this.$refs.purchaseOrderForm.validate((valid) => {
          // if (valid) {
            this.$axios
              .post('/admin/v1/pri/cpExcel/detail/verify', {
                id: _id,
                reson: _reson,
                opt: _opt
              }).then(resp => {
                if (resp && resp.data.code === 200) {
                  this.dialogFormVisible = false
                  this.$emit('onSubmit')
                } else {
                  this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                  })
               }
            })
          // } else {
          //   console.log('error submit')
          //   return false
          // }
        // })
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin: 0px 10px 0 10px;
    visibility: hidden;
  }
  .select {
    width: 120px;
    margin: 0px 10px 0 0px;
  }
</style>
