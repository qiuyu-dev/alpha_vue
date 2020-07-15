<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true">Excel上传</el-button>
    <el-dialog
      title="Excel上传"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="uploadForm">
        <el-form-item label="服务商" :label-width="formLabelWidth" prop="cid">
        <el-select v-model="form.category.id" placeholder="请选择服务商">
          <el-option label="服务商1" value="1"></el-option>
          <el-option label="服务商2" value="2"></el-option>
          <el-option label="服务商3" value="3"></el-option>
          <el-option label="服务商4" value="4"></el-option>
          <el-option label="服务商5" value="5"></el-option>
          <el-option label="服务商6" value="6"></el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="上传excel文件" :label-width="formLabelWidth" prop="url">
          <el-input v-model="form.url" autocomplete="off" placeholder="文件 URL"></el-input>
          <excel-upload @onUpload="uploadFile" ref="ExcelUpload"></excel-upload>
        </el-form-item>
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ExcelUpload from './ExcelUpload'
  export default {
    name: 'UploadForm',
    components: {ExcelUpload},
    data () {
      return {
        dialogFormVisible: false,
        form: {
          id: '',
          url: '',
          cid: '',
          category: {
            id: '',
            name: ''
          }
        },
        formLabelWidth: '120px'
      }
    },
    methods: {
      clear () {
        this.form = {
          id: '',
          url: '',
          cid: '',
          category: {
            id: '',
            name: ''
          }
        }
        this.$refs.uploadForm.resetFields()
      },
      onSubmit () {
        var id = this.form.id;
        var url = this.form.url;

        alert(url)
        // this.$axios
        //   .post('/admin/content/uploadFile', {
        //     id: this.form.id,
        //     url: this.form.url,
        //     category: this.form.category
        //   }).then(resp => {
        //     if (resp && resp.data.code === 200) {
        //       this.dialogFormVisible = false
        //       this.$emit('onSubmit')
        //     }
        // })
      },
      uploadFile () {
        this.form.url = this.$refs.ExcelUpload.url
      }
    }
  }
</script>

<style scoped>
  .add-button {
    margin: 0px 10px 0 10px;
  }
</style>
