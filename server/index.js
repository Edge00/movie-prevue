const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const { connect, initSchemas } = require('./database/init')

;(async () => {
  await connect()

  initSchemas()

  const Movie = mongoose.model('Movie')
  const movies = await Movie.find({})

  console.log(movies)

})()


app.use(async (ctx, next) => {
  ctx.body = '<h1>电影首页</h1>'
})

app.listen(4455)
