<template>
  <div style="text-align: left">
    <el-dialog
      title="用户信息"
      :visible.sync="dialogFormVisible" @close="closeDialog" width="40%">
      <el-form v-model="selectedUser" ref="dataForm"  label-width="80px">
        <el-form-item label="账号"  prop="username">
          <el-col :span="8">
          <label>{{selectedUser.username}}</label>
       </el-col>
        </el-form-item>
        <el-form-item label="姓名"  prop="name" >
          <el-col :span="16">
          <el-input v-model="selectedUser.name" autocomplete="off" ></el-input>
       </el-col>
        </el-form-item>
        <el-form-item label="联系电话" lprop="phone" >
          <el-col :span="16">
          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>
       </el-col>
        </el-form-item>
        <el-form-item label="E-Mail" prop="email">
          <el-col :span="16">
          <el-input v-model="selectedUser.email" autocomplete="off" @blur="validEmail(selectedUser.email)"></el-input>
      </el-col>
        </el-form-item>
        <el-form-item label="密码" prop="password" >
          <el-col :span="16">
          <el-button type="warning" @click="resetPassword(selectedUser.username)">重置密码</el-button>
       </el-col>
        </el-form-item>
        <el-form-item label="角色分配"  prop="roles">
          <el-col :span="24">
          <el-checkbox-group v-model="selectedRolesIds">
              <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameZh}}</el-checkbox>
          </el-checkbox-group>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
         <!-- <el-button  type="info" @click="dialogFormVisible = false">取 消</el-button> -->
      </div>
    </el-dialog>
    <!-- <el-row style="margin: 18px 0px 0px 18px "> -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!-- <el-breadcrumb-item :to="{ path: '/admin/dashboard' }">管理中心</el-breadcrumb-item>
        <el-breadcrumb-item>系统功能</el-breadcrumb-item> -->
        <el-breadcrumb-item>用户信息</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- </el-row> -->
    <el-card style="margin: 1% 1%;width: 98%">
      <el-table
        :data="users"
        stripe
        :default-sort = "{prop: 'id', order: 'ascending'}"
        :max-height="tableHeight">
        <!-- <el-table-column
          type="selection"
          width="55">
        </el-table-column> -->
        <!-- <el-table-column
          prop="id"
          label="id"
          sortable>
        </el-table-column> -->
        <el-table-column
          prop="username"
          label="账号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话">
        </el-table-column>
        <el-table-column
          prop="email"
          label="E-Mail">
        </el-table-column>
        <!-- <el-table-column
          label="状态"
          sortable
          width="100">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column> -->
        <el-table-column
        fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click="editUser(scope.row)"
              type="text" size="small">
              编辑
            </el-button>
            <!-- <el-button
              type="text"
              size="small">
              删除
            </el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <div >
        <!-- <el-button>取消选择</el-button>
        <el-button>批量删除</el-button> -->
      </div>
      <div style="margin: 20px 0 20px 0;float: right">
        <bulk-registration @onSubmit="listUsers()"></bulk-registration>
      </div>
    </el-card>
  </div>
</template>

<script>
import BulkRegistration from './BulkRegistration'
export default {
  name: 'UserProfile',
  components: {BulkRegistration},
  data () {
    return {
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: []
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    closeDialog () {      
      this.listUsers()
      this.listRoles()
    },
    listUsers () {
      var _this = this
      this.$axios.get('/admin/user/list').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.users = resp.data.result
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    listRoles () {
      var _this = this
      this.$axios.get('/admin/role/listbyuser').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.roles = resp.data.result
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    commitStatusChange (value, user) {
      if (user.username !== 'admin') {
        this.$axios.put('/admin/user/status', {
          enabled: value,
          username: user.username
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            if (value) {
              this.$message('用户 [' + user.username + '] 已启用')
            } else {
              this.$message('用户 [' + user.username + '] 已禁用')
            }
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
      } else {
        user.enabled = true
        this.$alert('不能禁用管理员账户')
      }
    },
    onSubmit (user) {
      let _this = this
      if (this.validEmail(user.email)) {
        return
      }
      // 根据视图绑定的角色 id 向后端传送角色信息
      let roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            roles.push(_this.roles[j])
          }
        }
      }
      this.$axios.put('/admin/user/edit', {
        username: user.username,
        name: user.name,
        phone: user.phone,
        email: user.email,
        roles: roles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功')
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    editUser (user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      let roleIds = []
      for (let i = 0; i < user.roles.length; i++) {
        roleIds.push(user.roles[i].id)
      }
      this.selectedRolesIds = roleIds
    },
    resetPassword (username) {
      this.$axios.put('/admin/user/password', {
        username: username
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码已重置为 123')
        } else {
          this.$alert(resp.data.message, '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    validEmail (email) {
      const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (!reg.test(email)) {
        this.$alert('E-Mail格式不正确', '提示', {
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
.dataForm {
  .el-input {
    width: 10px;
  }
}

</style>
