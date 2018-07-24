const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
  const {openid, bookid, comment, geodata, devicedata} = ctx.request.body
  try {
    await mysql('comments').insert({openid, bookid, comment, geodata, devicedata})
    ctx.state.data = {
      msg: 'comment stored'
    }
  } catch (event) {
    ctx.state = {
      code: -1,
      data: {
        msg: 'comment not stored'
      }
    }
  }
}
