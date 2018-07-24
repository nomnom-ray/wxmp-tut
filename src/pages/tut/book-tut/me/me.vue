<template>
  <div class="container">
    <div class="userInfoCSS">
      <img :src="userInfoData.avatarUrl" alt="">
      <p>{{userInfoData.nickName}}</p>
      <p>{{testnum}}</p>
      <button class="btn" v-if="userInfoData.openId" @click="scanBook">add books</button>
      <button v-else class="btn" open-type="getUserInfo" @getuserinfo="doLogin">user login</button>
    </div>
    <YearProgress></YearProgress>
  </div>
</template>

<script>
// import from node_module doesn't have a path
// qcloud gets methods from index.js; e.g. setLoginUrl is a client-sdk method
import { showSuccess, post, showModal } from '../../../../utils/utils'
import qcloud from 'wafer2-client-sdk'
import config from '../../../../utils/config'
import YearProgress from '../../../../components/book/yearProgress'
export default {
  data () {
    return {
      userInfoData: {
        avatarUrl: '../../../../../static/img/me.png',
        nickName: 'not logged in'
      }
    }
  },
  components: {
    YearProgress
  },
  methods: {
    doLogin (event) {
      const self = this
      const session = qcloud.Session.get()
      qcloud.setLoginUrl(config.loginURL)

      if (session) {
        qcloud.loginWithCode({
          success: function (userInfo) {
            showSuccess('log in code')
            console.log('log in code')
            qcloud.Session.set(userInfo)
            self.userInfoData = userInfo
          },
          fail: function (err) {
            console.log('info from code: ', err)
          }
        })
      } else {
        qcloud.login({
          success: function (userInfo) {
            showSuccess('log in reg')
            qcloud.Session.set(userInfo)
            self.userInfoData = userInfo
          },
          fail: function (err) {
            console.log('info from reg: ', err)
          }
        })
      }
    },
    scanBook () {
      // by picture selection on emulator;
      // function on mobile needs dev-env set in cloud
      wx.scanCode({
        // for some reason, barcode doesn't work
        scanType: 'qrCode',
        success: res => {
          console.log(res)
          this.addBook(res.result)
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    async addBook (bookIsbn) {
      // post res.result to server over http
      // whether the request is sent is visible in network tab
      // res here is after "resolve(res.data.data)"
      const res = await post('/weapp/addbook', {bookIsbn, openId: this.userInfoData.openId})
      showModal(res.title, 'book added')
      // showModal(`book added for ${res.data.title}`)
    }
  },
  created () {
    // on create, data is overwritten by sync
    const userInfoData = qcloud.Session.get()
    if (userInfoData) {
      this.userInfoData = userInfoData
    }
  }
}
</script>

<style lang="scss">
.userInfoCSS {
  margin-top: 100rpx;
  text-align: center;
  img {
    width: 150rpx;
    height: 150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
  login {
    color: white;
    background: #ea5a49;
    margin-bottom: 15px;
    text-align: center;
    border-radius: 2px;
    font-size: 16px;
    line-height: 30px;
    height: 30px;
    width: 200rpx;
  }
}
</style>
