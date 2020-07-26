<template>
  <div id="paper" class="main">
  <el-form :model="registerForm" :rules="rules" ref="registerForm" class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">企业管理员注册</h3>
    <el-form-item label="组织机构代码" :label-width="formLabelWidth" prop="orgcode">
      <el-input type="text" v-model.trim="registerForm.orgcode"
                auto-complete="off" placeholder="组织机构代码"></el-input>
    </el-form-item>
    <el-form-item label="企业名称" :label-width="formLabelWidth" prop="crop">
      <el-input type="text" v-model.trim="registerForm.crop"
                auto-complete="off" placeholder="企业名称"></el-input>
    </el-form-item>
    <el-form-item label="企业类型" :label-width="formLabelWidth" prop="ctype">
      <el-select v-model="registerForm.ctype" placeholder="请选择企业类型">
          <el-option label="保险商" value="1"></el-option>
          <el-option label="服务商" value="2"></el-option>
        </el-select>
    </el-form-item>             
    <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
      <el-input type="text" v-model.trim="registerForm.username"
                auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
      <el-input type="password" v-model.trim="registerForm.password"
                auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input type="text" v-model.trim="registerForm.name"
                auto-complete="off" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
      <el-input type="text" v-model.trim="registerForm.phone"
                auto-complete="off" placeholder="联系电话"></el-input>
    </el-form-item>
    <el-form-item label="email" :label-width="formLabelWidth" prop="email">
      <el-input type="text" v-model.trim="registerForm.email"
                auto-complete="off" placeholder="email" @blur="validEmail()"></el-input>
    </el-form-item>       
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 40%;background: #505458;border: none" v-on:click="register">注册</el-button>
      <router-link to="login"><el-button type="primary" style="width: 40%;background: #505458;border: none">返回</el-button></router-link>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        formLabelWidth: '120px',
        rules: {
          orgcode: [{required: true, message: '组织机构代码不能为空', trigger: 'blur'}],
          crop: [{required: true, message: ' 企业名称不能为空', trigger: 'blur'}],
          ctype: [{required: true, message: '请选择公司类型', trigger: 'blur'}],
          username: [{required: true, message: '账号不能为空', trigger: 'blur'}],
          password: [{required: true, message: '密码不能为空', trigger: 'blur'}],
          name: [{required: true, message: '姓名不能为空', trigger: 'blur'}],
          phone: [{required: true, message: '联系电话不能为空', trigger: 'blur'}],
          email: [{required: true, message: 'email不能为空', trigger: 'blur'}]
        },
        checked: true,
        registerForm: {
          orgcode: '',
          crop: '',
          ctype: '',
          username: '',
          password: '',
          name: '',
          phone: '',
          email: ''         
        },
        loading: false
      }
    },
    methods: {
      register () {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
              if(this.validEmail()){
                return 
              }
              var _this = this
              this.$axios.post('/register', {
              crop: this.registerForm.crop,
              orgcode: this.registerForm.orgcode,
              ctype: this.registerForm.ctype,
              username: this.registerForm.username,
              password: this.registerForm.password,
              name: this.registerForm.name,
              phone: this.registerForm.phone,
              email: this.registerForm.email,
              itype: 1
              // 插入类型1为注册，2为管理员添加
            }).then(resp => {
                if (resp.data.code === 200) {
                  this.$alert('注册成功', '提示', {
                    confirmButtonText: '确定'
                  })
                  _this.$router.replace('/login')
                } else {
                  this.$alert(resp.data.message, '提示', {
                    confirmButtonText: '确定'
                  })
                }
              }).catch(failResponse => {})
            } else {
              console.log('error submit')
              return false
          }
        })
      },
     validEmail() {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if(!reg.test(this.registerForm.email)){
           this.$alert('邮箱格式不正确', '提示', {
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
<style>
.main {
  padding: 0 ;
  text-align: center;
}
  #paper {
    /*background:url("../assets/img/bg/eva1.jpg") no-repeat;*/
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: -5px 0px;
  }
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 5px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
