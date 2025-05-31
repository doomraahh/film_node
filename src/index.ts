import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = new Elysia()
  .use(cors())
  .post('/api/movies', async ({ body }) => {
    const movie = await prisma.movie.create({
      data: body as any
    })
    return movie
  })
  .get('/api/movies/:id', async ({ params: { id } }) => {
    const movie = await prisma.movie.findUnique({
      where: { id: Number(id) }
    })
    if (!movie) {
      return new Response('Movie not found', { status: 404 })
    }
    return movie
  })
  .get('/api/movies', async () => {
    const movies = await prisma.movie.findMany()
    return movies
  })
  .delete('/api/movies/:id', async ({ params: { id } }) => {
    try {
      const movie = await prisma.movie.delete({
        where: { id: Number(id) }
      })
      return movie
    } catch (error) {
      return new Response('Movie not found', { status: 404 })
    }
  })
  .listen(3000)

console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`) 