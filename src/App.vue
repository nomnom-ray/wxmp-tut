<script>
// imported functions are in {}
// import {get} from './utils/utils'
  export default {
  async created () {
    // wait to get a response from "host" for url "weapp/demo"
    // const res = await get('/weapp/demo')
    // console.log(res)

    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    console.log('app created')
  }
  }
</script>

<style lang="scss">
  /* importing here is global for all pages because 'scoped' not used */
  /* importing css this way leads to error with some syntax;
    the error won't appear if written in this scope */
  @import '../node_modules/weui/dist/style/weui.css';

  // using scss needs a loader and a test/loader case added to the rules in webpack.base.conf.js
  $background:rgb(255, 215, 215);
  html{background:$background;}

  .text-primary {
    color: #EA5A49;
  }
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10rpx 0;
    box-sizing: border-box;
  }

  .btn {
    color: white;
    background: #EA5A49;
    margin-bottom: 10px;
    padding-left: 15px;
    border-radius: 2px;
    font-size: 16px;
    line-height: 40px;
    height: 40px;
    width: 100%;
  }
  .btn:active {
    background: #FA5A49;
  }
</style>
