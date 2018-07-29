import path from 'path';
import serve from 'koa-static';

export const router = app => {
  const publicPath = path.join(__dirname, '../../static');
  app.use(serve(publicPath))
}