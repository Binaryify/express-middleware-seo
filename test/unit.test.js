const express = require('express')
const path = require('path')
const request = require('supertest')
const assert = require('assert')
const cheerio = require('cheerio')
const app = express()
const { seoMiddleware } = require('../app')

app.use(
  seoMiddleware({
    render: {
      useReady: true,
      renderTimeout: 10000
    }
  })
)

app.use(express.static(__dirname + '/static'))

describe('Simulation of crawler', () => {
  it('Simulation of Baidu, response HTML should include "Im ready now"', done => {
    sleep(3000).then(() => {
      request(app).get('/').set('User-Agent', 'baiduspider').end((err, res) => {
        const $ = cheerio.load(res.text)
        assert($('h1').text() == 'Im ready now')
        done()
      })
    })
  })
  it('Simulation of Google, response HTML should include "Im ready now"', done => {
    request(app).get('/').set('User-Agent', 'googlebot').end((err, res) => {
      const $ = cheerio.load(res.text)
      assert($('h1').text() == 'Im ready now')
      done()
    })
  })
  it('Response HTML should include "You are not a crawler, I will be ready after 1S"', done => {
    request(app).get('/').end((err, res) => {
      const $ = cheerio.load(res.text)
      assert(
        $('h1').text() == 'You are not a crawler, I will be ready after 1S'
      )
      done()
    })
  })
})

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}
