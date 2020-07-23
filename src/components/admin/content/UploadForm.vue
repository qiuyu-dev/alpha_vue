<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">Excel上传</el-button>
    <el-dialog
      title="Excel上传"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form :model="uploadForm" :rules="rules" style="text-align: left" ref="uploadForm">
        <el-form-item label="服务商" :label-width="formLabelWidth" prop="cid">
        <el-select @change="getOptions" v-model="uploadForm.cid" placeholder="请选择服务商">
          <el-option v-for="(item,index) in objData" :key="index" :value="item.id" :label="item.name"/>
        </el-select>
        </el-form-item>
        <el-form-item label="上传excel文件" :label-width="formLabelWidth" prop="url">
          <el-input v-model="uploadForm.url" autocomplete="off" placeholder="文件 URL"></el-input>
            <el-upload
              class="excel-upload"
              ref="excelUpload"
              action="http://localhost:8443/api/admin/content/uploadFile"
              with-credentials
              :on-change="handleChange"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-upload="beforeUpload"
              :before-remove="beforeRemove"
              :on-success="handleSuccess"
              multiple
              :limit="1"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              :on-exceed="handleExceed"
              :auto-upload="false"
              :data="getData()"
              :file-list="fileList"
              >
              <!-- <i class="el-icon-upload"></i>
              <div class="ec-upload__text">将文件拖到此处,或<em>点击上传</em></div> -->
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-
              ">只能上传xlsx/xls的excel文件</div>
            </el-upload>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="uploadForm.id" autocomplete="off"></el-input>
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
  // import ExcelUpload from './ExcelUpload'
  export default {
    name: 'uploadForm',
    // components: {ExcelUpload},
    data () {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false,
        fileList: [],
        objData: [],
        uploadForm: {
          cid: ''          
        },        
        rules:{
          category: [
              {required: true, message: '请选择服务商', triger: 'change'}
            ]
        }        
      }
    },
    methods: {
      getData () {
        return this.uploadForm
      },
      clear () {
        this.uploadForm = {
          cid: ''
        }
        this.fileTemp == null
        // this.$refs.excelUpload.clearFiles()
        // this.$refs.uploadForm.resetFields()
      },
      beforeUpload (file) {
        console.log('beforeUpload...')
      },      
      // excel表上传
      handleChange (file, fileList) {
        console.log('handleChange..')
        this.fileTemp = file.raw
        // 判断上传文件格式
        if (this.fileTemp) {
          if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')) {
              if (this.fileTemp.size < 5*1024*1024 ) {//文件大小须小于5M
                  return true                 
              } else {
                  this.$message({
                  type:'warning',
                  message:'文件不能大于5M！'
                  })
                  return false
              }
            } else {
              this.$message({
                type:'warning',
                message:'文件格式错误，请删除后重新上传！'
                })
                return false
            }
        } else {
          this.$message({
            type:'warning',
            message:'请上传文件！'
          })
        }
      }, 
      handlePreview (file) {
        // console.log(file)
        // 此处的 file 是整个文件
        console.log('preview..')
        console.log(file.response)
      },
      handleRemove (file, fileList) {
        console.log('handleRemove ...')
        // console.log(file, fileList)
        this.fileTemp = null
      },      
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.uploadForm.url = response
        console.log('handleSuccess...')
        console.log(this.uploadForm.url)
        this.$emit('onUpload')
        this.$message.warning('上传成功')
      },
      onSubmit () {
        var _cid  = this.uploadForm.cid;
        if (_cid == ''){          
          this.$alert("请选择服务商", '提示', {
                  confirmButtonText: '确定'
                })
          return
        } 
        if (this.fileTemp == null){          
          this.$alert("请选择excel文件上传", '提示', {
                  confirmButtonText: '确定'
                })
          return
        }
          this.$refs.uploadForm.validate((valid) => {
             if (valid) {
                //手动上传文件，在点击确认的时候 校验通过才会去请求上传文件的url
                this.$refs.excelUpload.submit();
                // this.$axios.post('/admin/content/uploadFileProcess', {
                //   url: _url,
                //   cid: _cid
                //   }).then(resp => {
                //     if (resp && resp.data.code === 200) {
                //       this.dialogFormVisible = false
                //       this.$emit('onUpload')
                //       console.log(resp.data.message)
                //     }
                //   })
              } else {
               console.log('error submit')
               return false               
             }
          })          
        
      },
      getOptions () {
        let _this = this
        this.$axios.get('/admin/content/companylist').then(resp => {
            if (resp && resp.data.code === 200) {
              _this.objData = resp.data.result
              console.log(_this.objData)

            }
          }).catch((error) =>{
            console.log(error)
          })        

      }
    },
    mounted () {
      this.getOptions()
    } 
  }
</script>

<style scoped>
  .add-button {
    margin: 0px 10px 0 10px;
  }
</style>
