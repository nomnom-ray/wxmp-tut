const https = require('https')
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
  const {bookIsbn, openId} = ctx.request.body
  if (bookIsbn && openId) {
    const checkInSQL = await mysql('books').select('isbn').where('isbn', bookIsbn)
    // console.log(checkInSQL)
    if (checkInSQL.length) {
      ctx.state = {
        code: -1,
        data: {
          msg: 'already added'
        }
      }
      return
    }
    let bookURL = `https://api.douban.com/v2/book/isbn/${bookIsbn}`
    const bookCallback = await bookJSON(bookURL)
    const rate = bookCallback.rating.average
    const {title, image, alt, publisher, summary, price} = bookCallback
    const tags = bookCallback.tags.map(v => {
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookCallback.author.join(',')
    const isbn = bookIsbn
    const openid = openId
    try {
      await mysql('books').insert({
        isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author})
      ctx.state.data = {
        title,
        msg: 'book stored'
      }
    } catch (event) {
      ctx.state = {
        code: -1,
        data: {
          msg: 'book store failed: ' + event.sqlMessage
        }
      }
    }
  }
}

function bookJSON (URL) {
  // QUESTION: why does bookJSON needs a promise when get() has a promise in utils?
  return new Promise((resolve, reject) => {
    https.get(URL, (res) => {
      let dataFromURL = ''
      res.on('data', data => {
        dataFromURL += data
      })
      res.on('end', () => {
        const bookData = JSON.parse(dataFromURL)
        if (bookData.title) {
          resolve(bookData)
        } else {
          reject(bookData)
        }
      })
    }).on('error', (event) => {
      // best to write error back to client
      console.log('https error: ', event)
    })
  })
}
