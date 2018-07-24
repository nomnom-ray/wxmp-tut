const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  try {
    // ctx.request.query has whatever parameter is passed in as options
    const {page} = ctx.request.query
    const bookListSize = 10
    // .join for combining two columns, where each row shares a common entre
    const getSQLBooks = await mysql('books')
                              .select('books.*', 'cSessionInfo.user_info')
                              .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                              .limit(bookListSize)
                              .offset(Number(page) * bookListSize)
                              .orderBy('books.id', 'desc')
    // replace and return to frontend user_info object with a clone with just nickName
    ctx.state.data = {
      bookList: getSQLBooks.map(book => {
        const userinfo = JSON.parse(book.user_info)
        return Object.assign({}, book, {
          user_info: {
            nickName: userinfo.nickName
          }
        })
      })
    }
  } catch (event) {
    ctx.state = {
      code: -1,
      data: {
        msg: 'book getting failed: ' + event.sqlMessage
      }
    }
  }
}
