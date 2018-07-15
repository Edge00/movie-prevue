const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const { connect, initSchemas, initAdmin } = require('./database/init')

;(async () => {
  await connect()
  initSchemas()
  await initAdmin()

  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')

})()

app.use(async (ctx, next) => {
  ctx.body = '<h1>电影首页</h1>'
})

app.listen(4455)
