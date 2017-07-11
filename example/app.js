const express = require('express')
const path = require('path')
const app = express()
const { seoMiddleware } = require('../app')

app.use(
  seoMiddleware({
    render: {
      // use `window.isPageReady=1` to notify chrome-render page has ready
      useReady: true,
      renderTimeout: 10000
    }
  })
)

app.use(express.static(__dirname + '/static'))

app.listen(3000)
