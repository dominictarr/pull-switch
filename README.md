# pull-switch

split a pull-stream into many substreams

``` js
var pull = require('pull-stream')
var switch = require('pull-switch')

pull.count(100)
  .pipe(switch(function select (e) {
    // return key for which stream this is directed to.
    return e % 2 ? 'even' : 'odd'
  }, function createStream(key) {
    //return a stream that will be piped to...
    return pull.drain(function (d) {
      console.log(key+'>', d)
    })
  })

```


## License

MIT
