import { PrismaClient } from '@prisma/client'

export abstract class BaseController {
  protected prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  abstract registerRoutes(app: any): void; 
}