const cp = require('child_process')
const { resolve } = require('path')

;(async () => {

  const script = resolve(__dirname, '../crawler/movie-list')

  const child = cp.fork(script, [])

  let invoked = false

  child.on('error', err => {
    if (invoked) return

    invoked = true

    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return

    invoked = true
    const err = code === 0 ? null : new Error('exit error ' + code)

    console.log(err)
  })

  child.on('message', data => {
    const result = data.result

    console.log(result)
  })

})()