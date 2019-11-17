<template>
  <div id="form">
    <h2>更改密码</h2>
    <el-form :model="data" status-icon :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
      <el-form-item label="旧密码" prop="oldPassword" style="width:400px">
        <el-input type="password" v-model="data.oldPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" style="width:400px">
        <el-input type="password" v-model="data.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword" style="width:400px">
        <el-input type="password" v-model="data.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit()">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'
import userApi from 'src/api/userApi'
import SHA512 from 'crypto-js/sha512'

export default {
  name: 'UserPassword',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.data.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      data: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        oldPassword: [{ required: true, trigger: 'blur' }],
        newPassword: [{ required: true, trigger: 'blur' }],
        confirmPassword: [{ required: true, trigger: 'blur' }, { validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    submit() {
      var data = {
        token: this.token,
        old_password: SHA512(this.data.oldPassword).toString(),
        new_password: SHA512(this.data.newPassword).toString()
      }
      userApi.updatePassword(data).then(() => {
        this.$message({ message: '修改成功！', type: 'info', duration: 600, center: true })
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus" scoped>
.accounts-view
  #form
    height 600px
    padding-left 20px
    .errorStyle
      color #ff4949
      font-size 0.8em
    .input-line, .input-text
      width 360px
      margin-top 6px
      padding 6px 8px
      border 1px solid #ddd
      border-radius 3px
      background-color #fafafa
      box-shadow inset 0 1px 2px rgba(0, 0, 0, 0.075)
    .changePassword
      &:disabled
        color #aaa
        border 1px solid #e9e9e9
</style>
