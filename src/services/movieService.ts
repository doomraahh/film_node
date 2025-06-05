import prisma from '../database/prismaClient';

export const createMovie = async (data: any) => {
  return prisma.movie.create({ data });
};

export const getMovieById = async (id: number) => {
  return prisma.movie.findUnique({ where: { id } });
};

export const getAllMovies = async () => {
  return prisma.movie.findMany();
};

export const deleteMovie = async (id: number) => {
  return prisma.movie.delete({ where: { id } });
};