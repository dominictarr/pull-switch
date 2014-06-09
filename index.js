
var pull = require('pull-stream')
var pushable = require('pull-pushable')

module.exports = function (select, createStream) {
  var streams = {}, n = 0

  var sink = pull.drain(function (item) {
    var key = select(item)
    if(!streams[key]) {
      streams[key] = pushable(function (err) {
        delete streams[key]
        if(--n) return
      })
      pull(streams[key], createStream(key))
    }
    streams[key].push(item)
  }, function (err) {
    for(var key in streams) {
      streams[key].end(err)
    }
  })

  sink.add = function (key, streams) {
    streams[key] = pushable(function (err) {
      delete streams[key]
      if(--n) return
    })
    pull(streams[key], sink)
  }

  return sink
}
