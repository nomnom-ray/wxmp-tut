<template>
  <div>
  <comment-table :commentListProp="commentList" v-if='sessionInfo.openId' type='user'></comment-table>
  <div v-if='sessionInfo.openId'>
      <div class="page-title">my books</div>
      <book-card 
        v-for='(book, index) in books' 
        :key='index'
        :bookProp='book'>
      </book-card>
      <div v-if='!books.length'>no books added</div>
  </div>
  </div>
</template>

<script>
  import CommentList from '../../../../components/book/commentList'
  import {get} from '../../../../utils/utils'
  import qcloud from 'wafer2-client-sdk'
  import Card from '../../../../components/book/card'
  export default {
    components: {
      commentTable: CommentList,
      bookCard: Card
    },
    data () {
        return {
          commentList: [],
          sessionInfo: {},
          books: []
        }
    },
    methods: {
      async getCommentList () {
        const res = await get('/weapp/commentlist', {openId: this.sessionInfo.openId})
        this.commentList = res.commentList || []
      },
      async getBooks () {
        const res = await get('/weapp/booklist', {
        openId: this.sessionInfo.openId
      })
      this.books = res.bookList
      },
      init () {
        wx.showNavigationBarLoading()
        this.getCommentList()
        this.getBooks()
        wx.hideNavigationBarLoading()
      }
    },
    onPullDownRefresh () {
      this.init()
      wx.stopPullDownRefresh()
    },
    onShow () {
        // preventing calling wx API all the time
      if (!this.sessionInfo.openId) {
        const sessionInfo = qcloud.Session.get()
        if (sessionInfo) {
            this.sessionInfo = sessionInfo
        }
        this.init()
      }
    }
  }
</script>

<style>
</style>
