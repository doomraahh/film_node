import { BaseController } from './baseController';

export class MovieController extends BaseController {

  registerRoutes(app: any): void {
    app
      .post('/api/movies', (ctx: any) => this.createMovie(ctx))
      .get('/api/movies/:id', (ctx: any) => this.getMovieById(ctx))
      .get('/api/movies', () => this.getAllMovies())
      .delete('/api/movies/:id', (ctx: any) => this.deleteMovie(ctx));
  }

  async createMovie({ body }: { body: any }) {
    return await this.prisma.movie.create({ data: body });
  }

  async getMovieById({ params: { id } }: { params: { id: string } }) {
    const movie = await this.prisma.movie.findUnique({ where: { id: Number(id) } });

    if (!movie) {
      return new Response('Movie not found', { status: 404 });
    }

    return movie;
  }

  async getAllMovies() {
    return await this.prisma.movie.findMany();
  }

  async deleteMovie({ params: { id } }: { params: { id: string } }) {
    try {
      return await this.prisma.movie.delete({ where: { id: Number(id) } });
    } catch (error) {
      return new Response('Movie not found', { status: 404 });
    }
  }
}