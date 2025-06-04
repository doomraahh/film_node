import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { PrismaClient } from '@prisma/client'

class MovieController {
  private prisma: PrismaClient

  constructor(prisma: PrismaClient) {
    this.prisma = prisma
  }

  async createMovie({ body }: { body: any }) {
    const movie = await this.prisma.movie.create({
      data: body
    })
    return movie
  }

  async getMovieById({ params: { id } }: { params: { id: string } }) {
    const movie = await this.prisma.movie.findUnique({
      where: { id: Number(id) }
    })

    if (!movie) {
      return new Response('Movie not found', { status: 404 })
    }

    return movie
  }

  async getAllMovies() {
    return await this.prisma.movie.findMany()
  }

  async deleteMovie({ params: { id } }: { params: { id: string } }) {
    try {
      const movie = await this.prisma.movie.delete({
        where: { id: Number(id) }
      })
      return movie
    } catch (error) {
      return new Response('Movie not found', { status: 404 })
    }
  }
}

class MovieApp {
  private app: Elysia
  private movieController: MovieController

  constructor() {
    const prisma = new PrismaClient()
    this.movieController = new MovieController(prisma)
    this.app = new Elysia()
      .use(cors())
      .post('/api/movies', (ctx) => this.movieController.createMovie(ctx))
      .get('/api/movies/:id', (ctx) => this.movieController.getMovieById(ctx))
      .get('/api/movies', () => this.movieController.getAllMovies())
      .delete('/api/movies/:id', (ctx) => this.movieController.deleteMovie(ctx))
  }

  listen(port: number) {
    this.app.listen(port)
    console.log(`🦊 Server is running at ${this.app.server?.hostname}:${this.app.server?.port}`)
  }
}

new MovieApp().listen(3000)
