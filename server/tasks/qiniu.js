const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

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
  const movies = await Movie.find({
    $or: [
      { videoKey: { $exists: false } },
      { videoKey: null },
      { videoKey: '' }
    ]
  })

  for (let i = 0; i < movies.length; i++) {
    const movie = movies[i]
    if (movie.video && !movie.videoKey) {
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

        await movie.save()
      } catch (err) {
        console.log(err)
      }
    }
  }
})()