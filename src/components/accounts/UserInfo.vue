<template>
  <div id="form">
    <h2>我的信息</h2>
    <el-form ref="form" :model="form" label-width="80px" label-position="top">
      <el-form-item label="用户名" style="width:400px">
        <el-input v-model="user.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="昵称" style="width:400px">
        <el-input v-model="user.nickname"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" style="width:400px">
        <el-input v-model="user.email"></el-input>
      </el-form-item>
      <el-form-item label="手机" style="width:400px">
        <el-input v-model="user.phone"></el-input>
      </el-form-item>
      <el-form-item label="个性签名" style="width:400px">
        <el-input v-model="user.motto"></el-input>
      </el-form-item>
      </el-form>
    <el-button type="primary" @click="submit()" style="margin-left: 150px">保 存</el-button>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import userApi from 'src/api/userApi'

export default {
  name: 'UserInfo',
  data() {
    return {
      user: {
        name: '',
        phome: '',
        email: '',
        motto: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  created() {
    this.get()
  },
  methods: {
    submit() {
      var data = {
        'Token': this.token,
        'Name': this.user.username,
        'Nickname': this.user.nickname,
        'Phone': this.user.phone,
        'Email': this.user.email,
        'Motto': this.user.motto
      }
      userApi.updateProfile(data).then(() => {
        this.$message({ message: '修改成功！', type: 'info', duration: 600, center: true })
      })
    },
    get() {
      var data = { 'Token': this.token }
      userApi.getProfile(data).then((response) => {
        this.user = response.data.user_info
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
