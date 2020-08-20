<template>
  <div id="paper" class="main">
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules"  class="login-container">
    <h3>保险数据应用平台</h3>
    <el-form-item prop="username">
      <el-input
        ref="username"
        type="text"
        v-model="loginForm.username"
        auto-complete="off"
        placeholder="账号"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        ref="password"
        type="password"
        v-model="loginForm.password"
        auto-complete="off"
        placeholder="密码"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button v-on:click="login" type="primary">登录</el-button>
      <router-link to="registerEnterprise">
        <el-button type="primary">注册</el-button>
      </router-link>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (value.length === 0 || value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length === 0 || value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, trigger: 'blur', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          var _this = this
          console.log(this.$store.state)
          this.$axios
            .post('/login', {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            .then((resp) => {
              if (resp.data.code === 200) {
                var data = resp.data.result
                _this.$store.commit('login', data)
                var path = this.$route.query.redirect
                this.$router.replace({
                  path: path === '/' || path === undefined ? '/admin' : path
                })
              } else {
                this.$alert(resp.data.message, '提示', {
                  confirmButtonText: '确定'
                })
              }
            })
            .catch((failResponse) => {
              console.log(failResponse.message)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    keyDown (e) {
      // 如果是回车则执行登录方法
      if (e.keyCode == 13) {
        this.login()
      }
    }
  },
  mounted () {
    // 绑定事件
    window.addEventListener('keydown', this.keyDown)
  },
  destroyed () {
    window.removeEventListener('keydown', this.keyDown, false)
  }
}
</script>
<style  scoped>
.main {
  padding: 0 ;
  text-align: center;
}
  #paper {
    background:url("../assets/img/bg/back1.jpeg") no-repeat;
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
  margin: 90px auto;
  width: 30%;
  /* height: 30%; */
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  min-height: 30%;
  overflow: hidden;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
