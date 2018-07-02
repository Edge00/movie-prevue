const rp = require('request-promise-native')

const fetchMovie = async (item) => {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`
  const result = await rp(url)
  return result
}

;(async () => {
  let movies = [
    {
      doubanId: 26974046,
      title: '为了你我愿意热爱整个世界',
      rete: 6.9,
      poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p2516929917.jpg'
    },
    { doubanId: 30133757,
      title: '食女',
      rete: 7,
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2526523875.jpg'
    }
  ]

  movies.map(async movie => {
    let movieData = await fetchMovie(movie)
    console.log(movieData)
  })





})()





