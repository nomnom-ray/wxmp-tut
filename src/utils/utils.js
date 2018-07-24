/* jshint esversion: 6 */

import config from './config'

// a function that promises a response for wx.request to "host"
function httpRequest (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.host + url,
      method,
      data,
      success: function (res) {
      // .code is status code
      // === must be type equal
      if (res.data.code === 0) {
        resolve(res.data.data)
      } else {
        showModal(res.data.data.msg, 'book NOT added')
        reject(res.data)
      }
      }
    })
  })
}

export function get (url, data) {
  return httpRequest(url, 'GET', data)
}

export function post (url, data) {
  return httpRequest(url, 'POST', data)
}

export function showSuccess (text) {
  wx.showToast({
    title: text,
    icon: 'success'
  })
}

export function showModal (title, content) {
  wx.showModal({
    title,
    content,
    showCancel: false
  })
}
