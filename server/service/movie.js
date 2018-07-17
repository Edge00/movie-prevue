
const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')

export const getAllMovies = async (type, year) => {
  const query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }
  if (year) {
    query.year = year
  }
  const movies = await Movie.find(query)
  return movies
}

export const getMovieDetail = async (id) => await Movie.findOne({_id: id})

export const getRelativeMovies = async (movie) => {
  const movies = Movie.find({
    movieTypes: {
      $in: movie.movieTypes
    }
  })
  return movies
}




