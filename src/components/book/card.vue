<template>
  <a :href="detailURL">
  <div class="card-frame">
    <!-- click.stop to stop taking it to details; only run thumbPreview -->
    <div class="card-thumbnail" @click.stop="thumbPreview">
      <img class="thumbnail-img" :src="bookProp.image" mode="aspectFit">
    </div>
    <div class="card-detail">
      <div class="row text-primary">
        <div class="left">
          {{bookProp.title}}
        </div>
        <div class="right">
          {{bookProp.rate}} <book-rating :value="bookProp.rate"></book-rating>
        </div>
      </div>
      <div class="row">
        <div class="left">
          {{bookProp.author}}
        </div>
        <div class="right">
          {{bookProp.publisher}}
        </div>
      </div>
      <div class="row">
        <div class="left">
          Viewed: {{bookProp.count}}
        </div>
        <div class="right">
          {{bookProp.user_info.nickName}}
        </div>
      </div>
    </div>
  </div>
  </a>
</template>

<script>
  import Rate from './rate.vue'
  export default {
    props: ['bookProp'],
    components: {
      bookRating: Rate
    },
    computed: {
      detailURL () {
        // a new route is needed for every book image
        // ? is string query
        // the query (bookProp.id) is stored as a root option in mp, which can be accessed in details
        return '/pages/tut/book-tut/detail/main?id=' + this.bookProp.id
        }
    },
    methods: {
      thumbPreview () {
        wx.previewImage({
        current: this.bookProp.image,
        urls: [this.bookProp.image]
      })
      }
    }
  }
</script>

<style lang='scss' scoped>
  .card-frame {
  padding:15px;
  overflow: hidden;
  margin-top:5px;
  margin-bottom:5px;
  font-size:14px;
    .card-thumbnail {
    width:90px;
    height:90px;
    float: left;
    margin:0 auto;
    overflow:hidden;
      .thumbnail-img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .card-detail {
      margin-left: 100px;
      .row {
        line-height:20px;
        margin-bottom:3px;
      }
      .left {
        float: right;
      }
      .right {
        margin-right:160px;
      }
    }
  }
</style>
