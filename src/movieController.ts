import { BaseController } from './controller';
import { t } from 'elysia';
import { Elysia } from 'elysia';

interface MovieBody {
  title: string;
  director: string;
  releaseYear: number;
  description?: string;
}

interface MovieParams {
  id: string;
}

export class MovieController extends BaseController {
  registerRoutes(app: Elysia): void {
    app
      .post(
        '/api/movies',
        ({ body }: { body: MovieBody }) => this.createMovie({ body }),
        {
          body: t.Object({
            title: t.String(),
            director: t.String(),
            releaseYear: t.Number(),
            description: t.Optional(t.String()),
          }),
        }
      )
      .get(
        '/api/movies/:id',
        ({ params }: { params: MovieParams }) => this.getMovieById({ params }),
        {
          params: t.Object({
            id: t.String(), 
          }),
        }
      )
      .get('/api/movies', () => this.getAllMovies())
      .delete(
        '/api/movies/:id',
        ({ params }: { params: MovieParams }) => this.deleteMovie({ params }),
        {
          params: t.Object({
            id: t.String(),
          }),
        }
      );
  }

  async createMovie({ body }: { body: MovieBody }) {
    return await this.prisma.movie.create({
      data: {
        title: body.title,
        director: body.director,
        releaseYear: body.releaseYear,
        description: body.description,
      },
    });
  }

  async getMovieById({ params }: { params: MovieParams }) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: Number(params.id) },
    });

    if (!movie) {
      return new Response('Movie not found', { status: 404 });
    }

    return movie;
  }

  async getAllMovies() {
    return await this.prisma.movie.findMany();
  }

  async deleteMovie({ params }: { params: MovieParams }) {
    try {
      return await this.prisma.movie.delete({
        where: { id: Number(params.id) },
      });
    } catch (error) {
      return new Response('Movie not found', { status: 404 });
    }
  }
}
