<template>
  <div class="container">
    <top-book-swiper :mostViewedProp="mostViewedBooks"></top-book-swiper>
    <list-card :key="index" v-for="(book,index) in bookList" :bookProp="book"></list-card>  
    <p class='text-footer' v-if='!morePages'>no more books</p>
  </div>
</template>

<script>
  import {get} from '../../../../utils/utils'
  import Card from '../../../../components/book/card'
  import BookSwiper from '../../../../components/book/bookSwiper'
  export default {
    components: {
      listCard: Card,
      topBookSwiper: BookSwiper
    },
    data () {
      return {
        bookList: [],
        page: 0,
        morePages: true,
        mostViewedBooks: []
      }
    },
    methods: {
      async getBooks (firstPage) {
        if (firstPage) {
          this.page = 0
          this.morePages = true
        }
        wx.showNavigationBarLoading()
        // get() is after res.data in utils
        const res = await get('/weapp/booklist', {page: this.page})
        if (res.bookList.length < 10 && this.page > 0) {
          this.morePages = false
        }
        if (firstPage) {
          this.bookList = res.bookList
          wx.stopPullDownRefresh()
        } else {
          this.bookList = this.bookList.concat(res.bookList)
        }
        wx.hideNavigationBarLoading()
      },
      async getMostViewedBooks () {
        const res = await get('/weapp/bookrank')
        this.mostViewedBooks = res.mostViewedBooks
      }
    },
    mounted () {
      this.getBooks(true)
      this.getMostViewedBooks()
    },
    onPullDownRefresh () {
      // sometimes it doesn't work until the simulator restarts
      // in fact, a lot of the wx.API for pages and windows needs simulator restart
      this.getBooks(true)
      this.getMostViewedBooks()
    },
    onReachBottom () {
      // update current page number
      if (!this.morePages) {
        return false
      }
      this.page++
      this.getBooks()
    }
  }
</script>

<style>
</style>
