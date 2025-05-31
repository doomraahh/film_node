# Movies API

REST API для управления фильмами, построенное с использованием Node.js, Elysia, Prisma и PostgreSQL.

## Технологии

- [Node.js](https://nodejs.org/) - JavaScript runtime
- [Elysia](https://elysiajs.com/) - Web framework
- [Prisma](https://www.prisma.io/) - ORM
- [PostgreSQL](https://www.postgresql.org/) - База данных
- [TypeScript](https://www.typescriptlang.org/) - Типизированный JavaScript

## Требования

- Node.js 18 или выше
- PostgreSQL 12 или выше

## Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/your-username/movies-api.git
cd movies-api
```

2. Установите зависимости:
```bash
npm install
```

3. Создайте файл `.env` в корневой директории и добавьте строку подключения к PostgreSQL:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/movies_db?schema=public"
```

4. Примените миграции базы данных:
```bash
npm run prisma:migrate
```

5. Сгенерируйте Prisma Client:
```bash
npm run prisma:generate
```

## Запуск

Для запуска в режиме разработки:
```bash
npm run dev
```

Для сборки проекта:
```bash
npm run build
```

Для запуска в production режиме:
```bash
npm start
```

Сервер будет доступен по адресу: http://localhost:3000

## API Endpoints

### Создание фильма
```http
POST /api/movies
Content-Type: application/json

{
  "title": "Начало",
  "director": "Кристофер Нолан",
  "year": 2010,
  "description": "Коббу дается шанс на искупление..."
}
```

### Получение всех фильмов
```http
GET /api/movies
```

### Получение фильма по ID
```http
GET /api/movies/:id
```

### Удаление фильма
```http
DELETE /api/movies/:id
```

## Структура базы данных

### Movie
- `id` - Уникальный идентификатор (Int, автоинкремент)
- `title` - Название фильма (String)
- `director` - Режиссер (String)
- `year` - Год выпуска (Int)
- `description` - Описание фильма (String, опционально)
- `createdAt` - Дата создания записи (DateTime)
- `updatedAt` - Дата последнего обновления (DateTime)

## Скрипты

- `npm run dev` - Запуск в режиме разработки с hot-reload
- `npm run build` - Сборка проекта
- `npm start` - Запуск в production режиме
- `npm run prisma:generate` - Генерация Prisma Client
- `npm run prisma:migrate` - Применение миграций базы данных