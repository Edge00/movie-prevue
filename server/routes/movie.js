import { controller, get, post, put, del } from '../lib/decorator'
import {
  getAllMovies,
  getMovieDetail,
  getRelativeMovies
} from '../service/movie'


@controller('api/v0/movies')
export class movieController {

  @get('/')
  async getMovies(ctx, next) {
    const { type, year } = ctx
    const movies = await getAllMovies(type, year)
    ctx.body = {
      data: { movies },
      success: true
    }
  }

  @get('/:id')
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id

    const movie = await getMovieDetail(id)
    const relativeMovies = await getRelativeMovies(movie)

    ctx.body = {
      date: {
        movie,
        relativeMovies
      },
      success: true
    }
  }
}
