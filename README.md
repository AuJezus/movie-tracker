# Movie Tracker

Discover all kinds of movies or add your own, then sort them into lists and give them a rating.

## Features

- Authentication
- Movie data from TMDB
- Backend API
- Frontend using Next.js
- Personal lists
- Reviews
- Responsive design
- Other little stuff I forgot about

## How to run this for yourself

### Setup

1. Project is a monorepo managed by turborepo. You will need to create an account on **vercel** and get a **postgres** db up and running, you can follow [these](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database) easy steps. Also you will need to get google auth setup, follow [this](https://support.google.com/cloud/answer/6158849?hl=en). Finally follow [this](https://developer.themoviedb.org/docs/getting-started) and take note of the **api key**, not the bearer token.
2. When you done all of that next clone the project on your machine and run `npm i` in the root of the project.
3. Next we need to create `.env` files in `/apps/api` and `/packages/database`, there is a template called `.env.example` which you need to fill with the corresponding values and then you can remove the `.example`. You will need to generate a **JWT_SECRET** yourself, you can do this by typing in the console: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
4. Finally in the console type `npm run db:push`, then `npm run db:seed` to initialize the database.

### Running in dev mode

Move to the root of project and type command: `npm run dev`.

### Building and running the project.

Move to the root of the project.

Build by typing in the console `npm run build` and run by typing `npm run start`.

### Website and API
Website uses port 3000 and API uses port 3001. You can access the website on you local machine by going to localhost:3000 on your browser and make requests to the api on localhost:3001.
