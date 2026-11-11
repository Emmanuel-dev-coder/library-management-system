
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = await Promise.all(
    ['Fiction', 'Science', 'History', 'Technology'].map((name) =>
      prisma.genre.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const [fiction, science, history, technology] = genres;

  await prisma.book.createMany({
    data: [
      { title: '1984', author: 'George Orwell', genreId: fiction.id },
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genreId: fiction.id },
      { title: 'Pride and Prejudice', author: 'Jane Austen', genreId: fiction.id },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', genreId: fiction.id },

      { title: 'A Brief History of Time', author: 'Stephen Hawking', genreId: science.id },
      { title: 'Cosmos', author: 'Carl Sagan', genreId: science.id },
      { title: 'The Selfish Gene', author: 'Richard Dawkins', genreId: science.id },
      { title: 'The Origin of Species', author: 'Charles Darwin', genreId: science.id },

      { title: 'Sapiens', author: 'Yuval Noah Harari', genreId: history.id },
      { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', genreId: history.id },
      { title: 'The Diary of a Young Girl', author: 'Anne Frank', genreId: history.id },
      { title: 'The Silk Roads', author: 'Peter Frankopan', genreId: history.id },

      { title: 'Clean Code', author: 'Robert C. Martin', genreId: technology.id },
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', genreId: technology.id },
      { title: 'Code', author: 'Charles Petzold', genreId: technology.id },
    ],
  });

  console.log('4 genres and 15 books added successfully!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
