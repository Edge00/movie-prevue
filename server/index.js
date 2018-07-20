import Koa from 'koa'
import R from 'ramda'
import { resolve } from 'path';

import { connect, initSchemas, initAdmin } from './database/init'
const MIDDLEWARES = ['router']

const useMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

const start = async () => {
  await connect()
  initSchemas()
  await initAdmin()
  // require('./tasks/movie')
  // require('./tasks/api')
  // require('./tasks/trailer')
  // require('./tasks/qiniu')
  const app = new Koa()
  await useMiddlewares(app)
  app.listen(4455)
  console.log('app listen at 4455')
}

start()
