const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      } else {
        if (info.statusCode === 200) {
          resolve({ret})
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
  const movies = [
    {
      video: 'http://vt1.doubanio.com/201807030122/c3841c33aa8308bac2f559f962978661/view/movie/M/402310509.mp4',
      doubanId: '26627736',
      cover: 'https://img3.doubanio.com/img/trailer/medium/2523018626.jpg',
      poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2518403013.jpg'
    }
  ]

  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        console.log('喵喵喵 开始上传')
        const videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
        const coverData = await uploadToQiniu(movie.cover, nanoid() + '.jpg')
        const posterData = await uploadToQiniu(movie.poster, nanoid() + '.jpg') 
        console.log('喵喵喵 传完啦！')
   
        if (videoData.ret.key) {
          movie.videoKey = videoData.ret.key
        }
        if (coverData.ret.key) {
          movie.coverKey = coverData.ret.key
        }
        if (posterData.ret.key) {
          movie.posterKey = posterData.ret.key
        }
        console.log(movie)
      } catch (err) {
        console.log(err)
      }
    }
  })
  // { video: 'http://vt1.doubanio.com/201807030122/c3841c33aa8308bac2f559f962978661/view/movie/M/402310509.mp4',
  // doubanId: '26627736',
  // cover: 'https://img3.doubanio.com/img/trailer/medium/2523018626.jpg',
  // poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2518403013.jpg',
  // videoKey: 'fBVMHjTMpcFEfQCAabGIL.mp4',
  // coverKey: 'xVYkQfoVwO6PHNM_ZHLV~.jpg',
  // posterKey: 'dRQJy0etBk7TAUfhwbxWr.jpg' }

})()