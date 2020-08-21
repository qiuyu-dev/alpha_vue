<template>
  <div style="text-align: left">
    <el-button class="add-button" @click="dialogFormVisible = true" type="primary">批量添加用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="40%">
      <el-form :model="loginForm" :rules="rules" ref="loginForm" 
               label-width="80px">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input type="text" v-model="loginForm.name"
                    auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input type="text" v-model="loginForm.phone"
                    auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item  label="E-Mail" prop="email">
          <el-input type="text" v-model="loginForm.email"
                    auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="crop" style="height: 0">
          <el-input type="hidden" v-model="loginForm.crop"></el-input>
        </el-form-item> 
        <el-form-item prop="orgcode" style="height: 0">
          <el-input type="hidden" v-model="loginForm.orgcode"></el-input>
        </el-form-item>            -->
        <!-- <el-form-item style="width: 100%">
          
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button type="primary" v-on:click="register">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'BulkRegistration',
      data () {
        return {
          dialogFormVisible: false,
          formLabelWidth: '120px', 
          rules: {
            username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
            password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
            name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
            phone: [{required: true, message: '联系电话不能为空', trigger: 'blur'}],
            email: [{required: true, message: 'E-Mail不能为空', trigger: 'blur'}]
          },
          loginForm: {
            username: '',
            password: '',
            name: '',
            phone: '',
            email: '',
            crop: '',
            orgcode: ''
          }
        }
      } ,
      methods: {
        clear () {
          this.loginForm = {
            username: '',
            password: '',
            name: '',
            phone: '',
            email: '',
            crop: '',
            orgcode: ''
          }
        },
        register () {
          this.$refs.loginForm.validate((valid) => {
            if (valid) {
              if(this.validEmail()){
                    return 
              }
              this.$axios
                .post('/register', {
                  username: this.loginForm.username,
                  password: this.loginForm.password,
                  name: this.loginForm.name,
                  phone: this.loginForm.phone,
                  email: this.loginForm.email,
                  crop: this.loginForm.crop,
                  orgcode: this.loginForm.orgcode,
                  itype: 2
                  // 插入类型1为注册，2为管理员添加
                })
                .then(resp => {
                  if (resp.data.code === 200) {
                    this.$alert('注册成功', '提示', {
                      confirmButtonText: '确定'
                    })
                    this.clear()
                    this.$emit('onSubmit')
                  } else {
                    this.$alert(resp.data.message, '提示', {
                        confirmButtonText: '确定'
                      })
                  }
                })
                .catch(failResponse => {})
            }
            })
        },
        validEmail() {
          const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          if(!reg.test(this.loginForm.email)){
            this.$alert('E-mail格式不正确', '提示', {
                      confirmButtonText: '确定'
                    })
            return true
          } else {
            return false
          }
        }
      }
    }
</script>

<style scoped>
  .add-button {
    margin: 0px 10 0 10px;
  }
</style>
