<template>
  <div>
    <book-detail :detailProp="bookDetail"></book-detail>
    <div class="commentCSS" v-if="showAdd">
      <comment-table :commentListProp="commentList"></comment-table>
      <!-- v-model doesn't have binding -->
      <textarea v-model='comment' class="commentAreaCSS" :maxlength="100" placeholder="Enter comment"></textarea>
      <div class="geoDataCSS">
        <switch color='#EA5A49' :checked='geoData' @change='getLocation'>Location</switch>
        <span class='text-primary'>{{geoData}}</span>
      </div>
      <div class="deviceDataCSS">
        <!-- deviceData if not null, then it satisfies ":checked" -->
        <switch color='#EA5A49' :checked='deviceData' @change='getDevice'>Device</switch>
        <span class='text-primary'>{{deviceData}}</span>
      </div>
      <button class="btn" @click='addComment'>add comment</button>
    </div>
    <div v-else>
      log in first, or already commented
    </div>
  </div>
</template>

<script>
  import {get, post, showModal} from '../../../../utils/utils'
  import BookDetail from '../../../../components/book/bookDetail'
  import qcloud from 'wafer2-client-sdk'
  import CommentList from '../../../../components/book/commentList'
  export default {
    data () {
      return {
        bookid: '',
        bookDetail: {},
        comment: '',
        geoData: '',
        deviceData: '',
        sessionInfo: {},
        commentList: []
      }
    },
    components: {
      bookDetail: BookDetail,
      commentTable: CommentList
    },
    methods: {
      async getDetail () {
        // missing weapp/ is not going to throw error; carefull!!!
        const res = await get('/weapp/bookdetail', {bookid: this.bookid})
        wx.setNavigationBarTitle({
          title: res.title
        })
        this.bookDetail = res
      },
      async addComment () {
        const commentData = {
          openid: this.sessionInfo.openId,
          bookid: this.bookid,
          comment: this.comment,
          geodata: this.geoData,
          devicedata: this.deviceData
         }
        try {
          const res = await post('/weapp/addcomment', commentData)
          showModal(res.msg, 'stored')
          this.comment = ''
        } catch (event) {
          // msg is self defined in sever
          console.log(event.msg)
        }
      },
      getLocation (event) {
        if (event.target.value) {
          wx.getLocation({
            type: 'wgs84',
            success: (res) => {
            var latitude = res.latitude.toFixed(4)
            var longitude = res.longitude.toFixed(4)
            this.geoData = `lat/long: ${latitude}, ${longitude}`
            },
            fail: (res) => {
              this.geoData = ''
            }
          })
        }
      },
      getDevice (event) {
        if (event.target.value) {
          const deviceInfo = wx.getSystemInfoSync()
          this.deviceData = deviceInfo.model
        } else {
          this.deviceData = ''
        }
      },
      async getCommentList () {
        const res = await get('/weapp/commentlist', {bookId: this.bookid})
        this.commentList = res.commentList || []
      }
    },
    computed: {
      // methods update the changes of all methods under methods instantly
      // computed only changes those that needs to change
      // watch is for when you need the old and new value
      showAdd () {
        // not logged in
        if (!this.sessionInfo.openId) {
          return false
        }
        // there is a comment with user openid, which means that user already commented
        if (this.commentList.filter(comment => comment.openid === this.sessionInfo.openId).length) {
          return false
        }
        return true
      }
    },
    mounted () {
        // query here refers to string query that's passed in here
      this.bookid = this.$root.$mp.query.id
      const sessionInfo = qcloud.Session.get()
      if (sessionInfo) {
        this.sessionInfo = sessionInfo
      }
      this.getDetail()
      this.getCommentList()
    }
  }
</script>

<style lang='scss' scoped>
  .commentCSS {
    margin-top: 10px;
    .commentAreaCSS {
      width: 730rpx;
      height: 200rpx;
      background: #eee;
      padding: 10rpx;
    }
    .geoDataCSS {
      margin-top: 10px;
      padding: 5px 10px;
    }
    .deviceDataCSS {
      margin-top: 10px;
      padding: 5px 10px;
    }
  }
</style>
