<template>
  <div class="login-view">
    <h1 style="text-align:center">用户登录</h1>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" label-position="left">
        <el-form-item prop="username">
          <span class="svg-container">
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="用户名"
            type="text"
          />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
          </span>
          <el-input
            ref="password"
            v-model="loginForm.password"
            placeholder="密码"
            :type="passwordType"
          />
          <span class="show-pwd" @click="showPwd">
          </span></el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          style="margin-left:30px;margin-right:70px"
          @click.native.prevent="register"
        >注册
        </el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click.native.prevent="doLogin"
        >登录
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import SHA512 from 'crypto-js/sha512'
export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur' }]
      },
      passwordType: 'password'
    }
  },
  beforeCreate() {
    if (this.$store.state.user.login) {
      this.$router.replace('/')
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    register() {
      this.$router.push('/Register')
    },
    doLogin() {
      var data = {
        'Name': this.loginForm.username,
        'Password': SHA512(this.loginForm.password).toString()
      }
      this.$store.dispatch('doLogin', data).then(() => {
        this.$message({ message: '登录成功！', type: 'info', duration: 600, center: true })
        this.password = ''
        this.$router.push('/')
      }).catch((error) => {
        this.$message({ message: error, type: 'error', duration: 1000, center: true })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .login-view {
        margin-top: 50px
    }

    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: #454545;
    }

    .login-container {
        min-height: 100%;
        width: 100%;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 370px;
            max-width: 100%;
            padding: 100px 35px 0;
            margin: 0 auto;
            overflow: hidden;
        }

        .svg-container {
            position: absolute;
            padding: 6px 5px 6px 15px;
            vertical-align: middle;
            width: 30px;
            display: inline-block;
        }

        .title-container {
            position: relative;

            .title {
                font-size: 26px;
                margin: 0 auto 40px auto;
                text-align: center;
                font-weight: bold;
            }
        }

        .show-pwd {
            position: absolute;
            right: 10px;
            top: 7px;
            font-size: 16px;
            cursor: pointer;
            user-select: none;
        }
    }
</style>
