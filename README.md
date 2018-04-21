# read-text-stream [![npm-version][npm-badge]][npm-link]

Consume a readable stream with utf-8 encoding.

## Usage

```javascript
const readTextStream = require('read-text-stream')

fetch('some-url').then(res => readTextStream(res.body, (text, bytes) => {
  console.log(`Got ${bytes} bytes text: ${text}`)
})).then(fullText => {
  console.log(`Done loading.`)
})
```

## License

MIT @ [Amio][amio-link]

[amio-link]: https://github.com/amio
[npm-badge]: https://img.shields.io/npm/v/read-text-stream.svg?style=flat-square
[npm-link]: http://www.npmjs.com/package/read-text-stream
