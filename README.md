# Library Management System

## Project Overview

A Library Management API built with NestJS, Prisma ORM, and PostgreSQL hosted on Neon.

## Technologies Used

- NestJS – Backend framework
- PostgreSQL – Relational database
- Neon – Hosted PostgreSQL database
- Prisma – Database ORM
- TypeScript – Programming language

## Project Structure

```text
library-management-system/
├── api/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── src/
│   │   ├── prisma/
│   │   └── app.module.ts
│   ├── .env.example
│   └── package.json
└── README.md
```

## Database Setup

1. Navigate into the API folder.
2. Install dependencies using `npm install`.
3. Create an `.env` file using `.env.example` as a guide.
4. Add your Neon PostgreSQL connection string to `DATABASE_URL`.
5. Run migrations:

```bash
npx prisma migrate dev
```

6. Generate Prisma Client:

```bash
npx prisma generate
```

## Database Seeding

To populate the database with sample data, run:

```bash
npx prisma db seed
```

The seed script creates 4 genres and 15 books distributed across those genres.

## Running the API

From the `api` folder, run:

```bash
npm run start:dev
```

## Schema Decisions

The Book model references the Genre model through `genreId` and a Prisma relation instead of embedding genre information directly inside each book.

This design follows relational database principles. A genre is a separate entity that can be associated with many books. Using a foreign key avoids repeating genre information in every book and helps maintain data consistency.

For example, if the name of a genre changes, we only need to update it once in the Genre table rather than updating every book belonging to that genre.

## Relational Modeling vs Document Databases

Prisma relational modeling uses separate models connected through relationships and foreign keys. This provides structured data, consistency, and clear relationships between entities.

In document databases, related information can instead be embedded inside documents or connected using references. This offers more flexibility for nested data but may result in duplicated information when data is embedded.