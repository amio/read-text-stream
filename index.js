/**
 * Consume a readable stream with utf-8 encoding
 * @param  {ReadableStream} stream
 * @param  {Function} onText
 * @return {String}
 * @example
 *  const readTextStream = require('read-text-stream')
 *  fetch('some-url').then(res => readTextStream(res.body, (text, bytes) => {
 *    console.log(`Got ${bytes} bytes text: ${text}`)
 *  })).then(fullText => {
 *    console.log(`Done loading.`)
 *  })
 */
function readTextStreamAsync (stream, onText) {
  const decoder = new window.TextDecoder()

  let text = ''
  return readStreamAsync(stream, partial => {
    const chunk = decoder.decode(partial || new Uint8Array(), { stream: true })
    onText && onText(chunk, partial.byteLength)
    text += chunk
  }).then(() => text)
}

function readStreamAsync (stream, onPartial) {
  const reader = stream.getReader()
  return reader.read().then(function processChunk ({done, value}) {
    if (!done) {
      onPartial(value)
      reader.read().then(processChunk)
    }
  })
}

module.exports = readTextStreamAsync
