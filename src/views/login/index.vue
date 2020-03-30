<template>
  <div class="login-container">
    <div class="header-logo">
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="cardLeft">
        <div class="title-container">
          <!-- <div class="title_index"></div> -->
          <div class="line"></div>
          <div class="header">
            <span>Welcome</span> <br>
            <span>{{projectName}}</span>
          </div>
        </div>
        <div class="userForm">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input
              ref="username"
              v-model="loginForm.username"
              placeholder="Username"
              name="username"
              type="text"
              tabindex="1"
              autocomplete="on"
              class="changeA"
              style="position:absolute;top:-2px;left:30px;"
            />
          </el-form-item>
          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                class="changeB"
                style="position:absolute;top:-2px;left:30px;"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            type="primary"
            class="indexBtn"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </div>
      </div>

      <div class="banner"></div>

    </el-form>
    <!-- <div class="vision">版权所有2019中国人民财产保险责任股份有限公司 版本号Test 1.0</div> -->
  </div>
</template>

<script>
  import settings from '@/settings'

  export default {
    name: 'Login',
    /* components: { SocialSign },*/
    data() {
      return {
        loginForm: {
          username: 'A000011533',
          password: 'Fcfk2020'
        },
        loginRules: {
          username: [
            { required: true, trigger: 'blur'}
          ],
          password: [
            { required: true, trigger: 'blur'}
          ]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        showDialog: false,
        redirect: undefined,
        otherQuery: {},
        projectName: ''
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      this.projectName = settings.title
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
    },
    methods: {
      checkCapslock({ shiftKey, key } = {}) {
        if (key && key.length === 1) {
          if (
            (shiftKey && (key >= 'a' && key <= 'z')) ||
            (!shiftKey && (key >= 'A' && key <= 'Z'))
          ) {
            this.capsTooltip = true
          } else {
            this.capsTooltip = false
          }
        }
        if (key === 'CapsLock' && this.capsTooltip === true) {
          this.capsTooltip = false
        }
      },
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
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store
              .dispatch('user/login', this.loginForm)
              .then(res => {
                if (res === 'err') {
                  this.loading = false
                  return
                }
                console.log('redirect', this.redirect)
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
      // afterQRScan() {
      //   if (e.key === 'x-admin-oauth-code') {
      //     const code = getQueryObject(e.newValue)
      //     const codeMap = {
      //       wechat: 'code',
      //       tencent: 'code'
      //     }
      //     const type = codeMap[this.auth_type]
      //     const codeName = code[type]
      //     if (codeName) {
      //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //         this.$router.push({ path: this.redirect || '/' })
      //       })
      //     } else {
      //       alert('第三方登录失败')
      //     }
      //   }
      // }
    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  // $bg: #283443;
  $bg: #FEFAF7;
  $light_gray: #fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        /*color: $light_gray;*/
        color: #515a6e;
        height: 40px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px rgb(229, 229,229) inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
        &:-internal-autofill-selected{
          background-color: rgb(229, 229,229) !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      height: 40px;
    }
  }
</style>

<style lang="scss" scoped>
  $bg: #FEFAF7;
  $dark_gray: #889aa4;
  $light_gray: #eee;

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    background-size: cover;
    position: relative;
    overflow: hidden;

    .login-form {
      // border: 1px solid;
      position: relative;
      margin-bottom: 20px;
      width: 65%;
      height: 560px;
      min-width: 800px;
      min-height: 420px;
      padding: 160px 35px;
      overflow: hidden;
      background: #fff;
      box-shadow: -1px 5px 20px -6px #f05a50;
      border-radius: 8px;
    }

    .title-container {
      margin-top: -18px;
      margin-bottom: 38px;
      margin-left: 70px;
      display: flex;
      // align-items: center;
      & > .line {
        width: 6px;
        background-color: #f05a50;
        margin-right: 16px;
      }
    }
    .title-container > .header {
      color: #f05a50;
      font-size: 30px;
      font-weight: bold;
    }

    .cardLeft {
      position: absolute;
      z-index: 666;
    }

    .userForm {
      margin-left: 70px;
      width: 85%;
      z-index: 10000;
    }

    .banner {
      position: absolute;
      top: 80px;
      right: -20px;
      height: 400px;
      width: 600px;
      background: url("../../assets/images/banner2.png") center center no-repeat;
      background-size: 75% 75%;
    }
    .indexBtn{
      color: white;
      background-color:  #f05a50;
      width:100%;
      height:40px;
      margin:13px 0 0 0;
      border-radius: 5px;
      border: none;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 0px 0px 15px 15px;
      /*color: $dark_gray;*/
      color: #515a6e;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }

    .thirdparty-button {
      position: absolute;
      right: 0;
      bottom: 6px;
    }

    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
    .vision {
      position: absolute;
      bottom: 78px;
      left: 360px;
      width: 100%;
      height: 24px;
      text-align: center;
      color: #b2b2b2;
      font-size: 12px;
    }
  }
  .header-logo{
    z-index: 9999;
    width: 159px;
    height: 17px;
    background: url("../../assets/images/header-logo.png") no-repeat center center;
    position: fixed;
    top: 36px;
    left: 45px;
  }
</style>
