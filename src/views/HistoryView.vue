<template>
  <div class="history-view personal-center">
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="menu">
          <h2>我的记录</h2>
          <router-link class="menu-item" to="/history/browsing-history">浏览记录</router-link>
        </div>
      </el-col>
      <el-col :span="18">
        <router-view name="historyView" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HistoryView',
  beforeCreate() {
    // 如果没有登录，跳转到登录页面
    if (!this.$store.state.user.login) {
      this.$router.replace('/login')
    }
    this.$router.replace('/history/browsing-history')
  }
}
</script>
