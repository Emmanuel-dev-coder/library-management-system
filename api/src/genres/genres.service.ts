import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGenreDto) {
    try {
      return await this.prisma.genre.create({
        data: dto,
      });
    } catch (error) {
      throw new ConflictException('Genre name already exists');
    }
  }

  findAll() {
    return this.prisma.genre.findMany({
      include: { books: true },
    });
  }

  async findOne(id: number) {
    const genre = await this.prisma.genre.findUnique({
      where: { id },
      include: { books: true },
    });

    if (!genre) {
      throw new NotFoundException(`Genre ${id} not found`);
    }

    return genre;
  }

  async update(id: number, dto: UpdateGenreDto) {
    await this.findOne(id);

    try {
      return await this.prisma.genre.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      throw new ConflictException('Genre name already exists');
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.genre.delete({
      where: { id },
    });
  }
}