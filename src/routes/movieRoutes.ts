import { Elysia } from 'elysia';
import { MovieController } from '../controllers/movieController';

export const movieRoutes = new Elysia();
const controller = new MovieController();

movieRoutes
  .post('/api/movies', ctx => controller.create(ctx))
  .get('/api/movies/:id', ctx => controller.getById(ctx))
  .get('/api/movies', () => controller.getAll())
  .delete('/api/movies/:id', ctx => controller.delete(ctx));