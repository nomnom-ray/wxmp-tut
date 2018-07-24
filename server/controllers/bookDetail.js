const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  // ctx.request.query has whatever parameter is passed in as options
  const {bookid} = ctx.request.query

  // bookDetail is returns as a 1 element array; first() takes it out
  const bookDetail = await mysql('books')
                            .select('books.*', 'cSessionInfo.user_info')
                            .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                            .where('id', bookid)
                            .first()

  const userinfo = JSON.parse(bookDetail.user_info)
  // state.data is a nameless object with all the entries of books
  // be very careful that enter is forward slash '\n'
  ctx.state.data = Object.assign({}, bookDetail, {
    tags: bookDetail.tags.split(','),
    summary: bookDetail.summary.split('\n'),
    user_info: {
      nickName: userinfo.nickName,
      avatarUrl: userinfo.avatarUrl
    }
  })

  // this increment doesn't return anything; maybe no select() is an indication
  await mysql('books')
          .where('id', bookid)
          .increment('count', 1)
}
