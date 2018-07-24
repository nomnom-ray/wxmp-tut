const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {bookId, openId} = ctx.request.query
  const commentLists = mysql('comments')
                        .select('comments.*', 'cSessionInfo.user_info')
                        .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')

  // pick one
  let commentList
  if (bookId) {
    commentList = await commentLists.where('bookid', bookId)
  } else if (openId) {
    commentList = await commentLists.where('openid', openId)
  }

  ctx.state.data = {
    commentList: commentList.map(comment => {
      const userinfo = JSON.parse(comment.user_info)
      return Object.assign({}, comment, {
        user_info: {
            nickName: userinfo.nickName,
            avatarUrl: userinfo.avatarUrl
        }
      })
    })
  }
}
