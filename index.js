
var pull = require('pull-stream')
var pushable = require('pull-pushable')

module.exports = function (select, createStream) {
  var streams = {}, n = 0

  return pull.drain(function (item) {
    var key = select(item)

    if(!streams[key]) {
      streams[key] = pushable(function (err) {
        delete streams[key]
        if(--n) return
      })
      streams[key].pipe(createStream(key))
    }
    streams[key].push(item)
  }, function (err) {
    for(var key in streams) {
      streams[key].end(err)
    }
  })
}
