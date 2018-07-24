<template>
  <div class="bookdetailsCSS">
      <div class="thumbnailCSS">
        <img class='backdropCSS' :src="detailProp.image" mode='aspectFill'>
        <img class='bookdisplayCSS' :src="detailProp.image" mode='aspectFit'>
        <div class='thumbtextCSS'>
        <div class='booktitleCSS'>{{detailProp.title}}</div>
        <div class='bookauthorCSS'>{{detailProp.author}}</div>
        </div>
      </div>
      <div class="detailrowCSS">
        <img class='avatarCSS' :src="userInfo.avatarUrl" mode='aspectFill'>
        {{userInfo.nickName}}
        <div class="rightCSS">
          {{detailProp.rate}}
          <rate-stars :value="detailProp.rate"></rate-stars>
        </div>
      </div>
      <div class="detailrowCSS">
        {{detailProp.publisher}}
        <div class="rightCSS">
        {{detailProp.price}}
        </div>
      </div>
      <div class="tagrowCSS">
        <div class="tagCSS" :key="index" v-for="(tag, index) in detailProp.tags">{{tag}}</div>
      </div>
      <div class="summaryrowCSS">
        <p :key='i' v-for='(sum,i) in detailProp.summary'>{{sum}}</p>
      </div>
  </div>
</template>

<script>
import Rate from '../../components/book/rate'
  export default {
    components: {
      rateStars: Rate
    },
    props: ['detailProp'],
    computed: {
      userInfo () {
        // attached user_info to userInfo(), else empty object is none
        return this.detailProp.user_info || {}
      }
    },
    onShareAppMessage: function (res) {
      console.log(res)
      return {
        title: 'this.detailProp.title',
        path: '/pages/tut/book-tut/detail/main?id=' + this.$root.$mp.query.id,
        success: (res) => {
          console.log('success', res)
        },
        fail: (res) => {
          console.log('fail', res)
        }
      }
    },
    created () {
      wx.showShareMenu()
    }
  }
</script>

<style lang='scss'>
  .bookdetailsCSS {
    font-size: 14px;
    .tagCSS{
      display: inline-block;
      margin:5px;
      padding:5px;
      border-radius: 10px;
      border:1px #EA5A49 solid;
      color:#EA5A49;
    }
    .thumbnailCSS {
      width:750rpx;
      height:500rpx;
      overflow:hidden;
      position: relative;
      .backdropCSS {
        filter: blur(15px);
        width:100%;
      }
      .bookdisplayCSS {
        position: absolute;
        width:100%;
        height:300rpx;
        left:0;
        top:30rpx;
      }
      .thumbtextCSS {
        color:white;
        position: absolute;
        width:100%;
        left:0;
        top:330rpx;
        text-align: center;
        .booktitleCSS {
          font-size:20px;
        }
        .bookauthorCSS {
          font-size:14px;
        }
      }
    }
    .detailrowCSS {
      padding:5px 10px;
      .avatarCSS {
        width:20px;
        height:20px;
        border-radius: 50%;
        vertical-align: middle;
      }
      .rightCSS {
        float: right;
      }
    }
  }
</style>