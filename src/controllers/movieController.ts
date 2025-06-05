import { createMovie, getMovieById, getAllMovies, deleteMovie } from '../services/movieService';

export class MovieController {
  async create(ctx: any) {
    const movie = await createMovie(ctx.body);
    return movie;
  }

  async getById(ctx: any) {
    const movie = await getMovieById(Number(ctx.params.id));

    if (!movie) {
      return new Response('Movie not found', { status: 404 });
    }

    return movie;
  }

  async getAll() {
    return await getAllMovies();
  }

  async delete(ctx: any) {
    try {
      const movie = await deleteMovie(Number(ctx.params.id));
      return movie;
    } catch (error) {
      return new Response('Movie not found', { status: 404 });
    }
  }
}