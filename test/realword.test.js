const assert = require('assert')
const axios = require('axios')
const cheerio = require('cheerio')
describe('Simulation of crawler', () => {
  it('Simulation of Google, response HTML should include "Im ready now"', done => {
    axios
      .get('https://chrome-headless-wjwcvoordw.now.sh/', {
        headers: { 'User-Agent': 'googlebot' }
      })
      .then(function(response) {
        const $ = cheerio.load(response.data)
        assert($('h1').text() == 'Im ready now')
        done()
      })
      .catch(function(error) {
        console.log(error)
        done()
      })
  })
  it('Simulation of Baidu, response HTML should include "Im ready now"', done => {
    axios
      .get('https://chrome-headless-wjwcvoordw.now.sh/', {
        headers: { 'User-Agent': 'baiduspider' }
      })
      .then(function(response) {
        const $ = cheerio.load(response.data)
        assert($('h1').text() == 'Im ready now')
        done()
      })
      .catch(function(error) {
        console.log(error)
        done()
      })
  })
  it('Response HTML should include "You are not a crawler, I will be ready after 1S"', done => {
    axios
      .get('https://chrome-headless-wjwcvoordw.now.sh/')
      .then(function(response) {
        const $ = cheerio.load(response.data)
        assert(
          $('h1').text() == 'You are not a crawler, I will be ready after 1S'
        )
        done()
      })
      .catch(function(error) {
        console.log(error)
        done()
      })
  })
})
