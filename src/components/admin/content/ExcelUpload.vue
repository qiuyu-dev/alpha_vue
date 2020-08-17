<template>
  <div>
  <el-upload
    class="excel-upload"
    ref="excelUpload"
    action="http://localhost:8443/api/admin/v1/pri/cpExcel/excelUpload/test"
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
    :auto-upload="true"
    :file-list="fileList"
    >
    <!-- <i class="el-icon-upload"></i>
    <div class="ec-upload__text">将文件拖到此处,或<em>点击上传</em></div> -->
    <el-button size="small" type="primary" @click="handleUpload">点击上传</el-button>
    <div slot="tip" class="el-">只能上传xlsx/xls的excel文件</div>
  </el-upload>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>数据预览</span>
    </div>
    <div class="text item">
    <el-table :data="tableData" border highlight-current-row style="width: 100%;">
      <el-table-column v-for="(item,i) in tableHeader" :index="(i)" :prop="item" :label="item" :key='item'>
      </el-table-column>      
    </el-table>
    </div>
  </el-card>  
  </div>
</template>

<script>
import XLSX from 'xlsx'
import { export_excel_to_json, export_json_to_excel } from '@/vendor/Export2Excel.js'
  export default {
    name: 'excelUpload',
    data () {
      return {
        loading: false,
        fileList: [],
        url: '',
        fileTemp: '',
        file: '',
        excelData: {
          header: null,
          results: null
        },
        tableData: [],
        tableHeader: []
      }
    },
    methods: {
      beforeUpload (file) {
        console.log('beforeUpload...')
        const isLt1M = file.size / 1024 / 1024 < 1
        if (isLt1M) {
          return true
        }
        this.$message({
          message: 'Please do not upload files larger than 1m in size.',
          type: 'warning'
        })
        return false
      },
      generateData ({ header, results }) {
        this.excelData.header = header
        this.excelData.results = results       
      },
      handleDrop(e) {
        console.log("handleDrop")
        e.stopPropagation()
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files.length !== 1) {
            this.$message.error('Only support uploading one file!')
            return
        }
        const itemFile = files[0] // only use files[0]
        this.readerData(itemFile)
        e.stopPropagation()
        e.preventDefault()
      },
      handleDragover (e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      readerData (itemFile) {
        this.loading = true
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = e => {
            const data = e.target.result
            const workbook = XLSX.read(data, { type: 'array' })
            const firstSheetName = workbook.SheetNames[0]
            const worksheet = workbook.Sheets[firstSheetName]
            const header = this.getHeaderRow(worksheet)
            const results = XLSX.utils.sheet_to_json(worksheet)
            this.generateData({ header, results })
            this.loading = false
            resolve()
          }
          reader.readAsArrayBuffer(rawFile)
        })
      },      
      getHeaderRow(sheet) {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
          /* find the cell in the first row */
          let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
        return headers
      }, 
      // excel表上传
      handleChange (file, fileList) {
        console.log('handleChange..')
        this.fileTemp = file.raw
        // 判断上传文件格式
        if (this.fileTemp) {
          if ((this.fileTemp.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') || (this.fileTemp.type == 'application/vnd.ms-excel')) {
              if (this.fileTemp.size < 1*1024*1024 ) {//文件大小须小于1M
                  this.sayhello()                 
              } else {
                  this.$message({
                  type:'warning',
                  message:'文件不能大于1M！'
                  })
                  return false
              }
            // this.importfxx(this.fileTemp)
            //this.readerData(this.fileTemp)
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
      importfxx (obj) {
        let _this = this;
        // 通过DOM取文件数据
        this.file = obj
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            console.log(reader.result)
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
              type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是读取excel内容之后输出的东西
            this.da = [...outdata]
            let arr = []
            this.da.map(v => {
                let obj = {}
                obj.ip = v['ip'] //ip是表的标题
                obj.host = v['host']
                arr.push(obj)
            })          
            // return arr
            // 把读取的excel表格中的内容放进tableData2中(这里要改成自己的表的名字)
            _this.tableData = _this.tableData.concat(arr)
            console.log("lllllllllllllllllllll")
            // console.log(_this.tableData)
        }
        reader.readAsArrayBuffer(f);
      }
      if (rABS) {
        reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      handleRemove (file, fileList) {
        console.log('handleRemove ...')
        // console.log(file, fileList)
        this.fileTemp = null
      },
      handlePreview (file) {
        // console.log(file)
        // 此处的 file 是整个文件
        console.log('preview..')
        console.log(file.response)
      },
      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },
      beforeRemove (file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      handleSuccess (response) {
        this.url = response
        console.log(this.url)
        this.$emit('onUpload')
        this.$message.warning('上传成功')
      },
      clear () {
        this.$refs.ExcelUpload.clearFiles()
      },
      export2Excel () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader =
            [
            '编号', '标题', '作者','回顾', '时间'    
            ];
          const filterVal =
            ['id', 'title','author','pageviews','display_time'];  
           const list =
           [
             {id: 1, title: 2, author: 3, pageviews: 4, display_time: 5},
             {id: 6, title: 7, author: 8, pageviews: 9, display_time: 10},
             {id: 11, title: 12, author: 13, pageviews: 14, display_time: 15},
            ];
          const data = this.formatJson(filterVal, list);       
          export_json_to_excel(tHeader, data, 'excel文件'+ this.$moment(new Date()).format('YYYY-MM-DD 00:00:00'));
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      exportTemplate () {
        require.ensure([], () => {
          const { export_json_to_excel } = require('@/vendor/Export2Excel');
          const tHeader = ['登录账户','姓名','部门','电话'];
          const data = ['qq','qiuyu','abc','10086'];
          export_json_to_excel(tHeader, data, '模板');
          }
        )
      },
      sayhello(){
        alert('hi')
      }
    }
  }
</script>

<style scoped>
  .el-upload_tip{
    /*height: 200px;*/
  }
</style>
