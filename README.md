# pull-switch

split a pull-stream into many substreams

``` js
var pull = require('pull-stream')
var switch = require('pull-switch')

pull.count(100)
  .pipe(switch(function select (e) {
    return e % 2 ? 'even' : 'odd'
    //return key for which stream this is directed to.
  }, function createStream(key) {
    return pull.drain(function (d) {
      console.log(key+'>', d)
    })
  })

```


## License

MIT
