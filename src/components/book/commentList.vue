<template>
  <div class="comment-list">
    <div class="page-title" v-if='commentListProp.length'>
      forum
    </div>
    <div class="comment"
        v-for='comment in commentListProp' 
        :key='comment.id'
        @click="handleClick(comment)"
        >
      <div class="user">
        <div class="inline">
          <img :src="comment.user_info.avatarUrl" 
                class="avatar"
                mode='aspectFit'
            >
          {{comment.user_info.nickName}}
        </div>
        <div class="right">
          {{comment.geodata||'location unknown'}}
          <span class="text-primary">
            --
          </span>
          {{comment.devicedata||'device unknown'}}
        </div>
      </div>
      <div class="content">
        {{comment.comment}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['commentListProp', 'type'],
    methods: {
      handleClick (comment) {
        if (this.type === 'user') {
          wx.navigateTo({
            // the bookid is stored when comments are stored in detail
            url: '/pages/tut/book-tut/detail/main?id=' + comment.bookid
          })
        }
      }
    }
  }
</script>

<style lang='scss'>
.comment-list {
  background:#eee;
  font-size:14px;
  .comment {
    background: white;
    margin-bottom:10px;
    padding:5px 20px;
    .content {
      margin:10px 0;
    }
    .user {
      .inline {
        display:inline;
        .avatar {
          width:20px;
          height:20px;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
