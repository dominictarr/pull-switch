# pull-switch

split a pull-stream into many substreams

``` js
var pull = require('pull-stream')
var pswitch = require('pull-switch')

  pull(
    pull.count(100),
    pswitch(function select (e) {
      // return key for which stream this is directed to.
      return e % 2 ? 'even' : 'odd'
    }, function createStream(key) { // 'even' or 'odd'
      //return a stream that will be piped to...
      return pull.drain(function (d) {
        console.log(key+'>', d)
      })
    })
  )
```

has the same api as [pull-fork](https://github.com/dominictarr/pull-fork)
but reads the source at full power instead of trying to follow
backpressure closely. In somecases it's simpler to do this,
as waiting (for back-pressure to release) creates the possibility of
deadlocks.

## License

MIT
