import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { PrismaClient } from '@prisma/client';
import { MovieController } from './movieController';
import { BaseController } from './controller';

class App {
  private app: Elysia;
  private prisma: PrismaClient;
  private controllers: BaseController[];

  constructor(controllers: BaseController[]) {
    this.app = new Elysia().use(cors());
    this.prisma = new PrismaClient();
    this.controllers = controllers;

    this.initializeControllers();
  }

  private initializeControllers() {
    this.controllers.forEach(controller => controller.registerRoutes(this.app));
  }

  listen(port: number) {
    this.app.listen(port);
    console.log(`🦊 Server is running at ${this.app.server?.hostname}:${this.app.server?.port}`);
  }
}

const prismaClient = new PrismaClient();
const controllers = [
  new MovieController(prismaClient),
];

new App(controllers).listen(3000);