import AsyncLoad from './components/async_load'

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AsyncLoad(() => import('./pages/home'))
  },
  {
    name: '详情页',
    icon: 'home',
    path: '/detail',
    component: AsyncLoad(() => import('./pages/movie/detail'))
  }
]