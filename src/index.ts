import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { movieRoutes } from './routes/movieRoutes';

const app = new Elysia()
  .use(cors())
  .use(movieRoutes);

app.listen(3000, () => {
  console.log(`🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`);
});
