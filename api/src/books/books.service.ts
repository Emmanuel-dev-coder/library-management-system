
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    genreId?: string,
    search?: string,
    page = 1,
    limit = 10,
  ) {
    const where = {
      ...(genreId && { genreId: Number(genreId) }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' as const } },
          { author: { contains: search, mode: 'insensitive' as const } },
        ],
      }),
    };

    const [books, total] = await Promise.all([
      this.prisma.book.findMany({
        where,
        include: { genre: true },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.book.count({ where }),
    ]);

    return {
      data: books,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
      include: { genre: true },
    });

    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }

    return book;
  }

  create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: dto,
    });
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);

    return this.prisma.book.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.book.delete({
      where: { id },
    });
  }
}
