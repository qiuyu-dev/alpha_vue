<template>
  <el-upload
    class="img-upload"
    ref="upload"
    action="http://localhost:8443/api/admin/v1/pri/batchFee/uploadFile"
    with-credentials
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :before-upload = "beforeUpload"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      fileList: [],
      url: ''
    }
  },
  methods: {
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isPG = (isJPG || isPNG)                                       //限制图片格式为jpg / png
      const isLt2M = file.size / 1024 / 1024 < 0.5;                         //限制图片大小
      // const isSize = new Promise(function(resolve,reject) {
      //     let width = 600
      //     let height = 400
      //     let _URL = window.URL || window.webkitURL
      //     let img = new Image()
      //     img.onload = function() {
      //         let valid = img.width >= width && img.height >= height
      //         valid ? resolve() : reject();
      //     }
      //     img.src = _URL.createObjectURL(file)
      // }).then(() => {
      //     return file;
      // },()=>{
      //     this.$message.error('上传图片像素要大于600*400!');
      //     return promise.reject();
      // })
      if (!isPG) {
          this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
      }
      if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
      }
        return isPG && isLt2M
    },    
    handleRemove (file, fileList) {
      console.log('handleRemove')
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
      // 此处的 file 是整个文件
      // console.log(file.response)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      console.log('beforeRemove')
      let remove = true
      if (file && file.status === 'success') {
        remove = this.$confirm(`确定移除 ${file.name}？`)
      }
      return remove
    },
    handleSuccess (response) {
      if (response.code === 200) {
        this.url = response.result
        this.$emit('onUpload')
        this.$message.warning('上传成功')
      } else {
        this.$alert(response.message, '提示', {
                    confirmButtonText: '确定'
                  })
      }
    },
    clear () {
      this.$refs.upload.clearFiles()
    }
  }
}
</script>

<style scoped>
  .img-upload {
    /*height: 200px;*/
  }
</style>
