
var pull = require('pull-stream')
var pswitch = require('./')

pull.count(100)
  .pipe(pswitch(function select (e) {
    return e % 2 ? 'even' : 'odd'
    //return key for which stream this is directed to.
  }, function createStream(key) {
    return pull.drain(function (d) {
      console.log(key+'>', d)
    }, function () {
      console.log('END', key)
    })
  }))

