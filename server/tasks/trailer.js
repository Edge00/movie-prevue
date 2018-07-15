const cp = require('child_process')
const { resolve } = require('path')
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
const Category = mongoose.model('Category')

;(async () => {

  let movies = await Movie.find({
    $or: [
      { video: { $exists: false } },
      { video: null }
    ]
  })


  const script = resolve(__dirname, '../crawler/video')

  const child = cp.fork(script, [])

  let invoked = false

  child.send(movies)

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

  child.on('message', async data => {

    let { doubanId } = data
    let movie = await Movie.findOne({
      doubanId: doubanId
    })

    if (data.video) {
      movie.video = data.video
      movie.cover = data.cover
      await movie.save()
    } else {
      await movie.remove()

      let { movieTypes } = movie

      for (let i = 0; i < movieTypes.length; i++) {
        let type = movieTypes[i]
        let cat = await Category.findOne({
          name: type
        })

        if (cat && cat.movies) {
          const index = cat.movies.indexOf(movie._id)
          if (index > -1) {
            cat.movies = cat.movies.splice(index, 1)
          }
          await cat.save()
        }
      }

    }

  })

})()
