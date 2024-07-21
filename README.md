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

## How to Run This for Yourself

### Setup

1. The project is a monorepo managed by Turborepo. You will need to create an account on **Vercel** and set up a **Postgres** database. Follow these [easy steps](https://vercel.com/docs/storage/vercel-postgres/quickstart#create-a-postgres-database). Additionally, you will need to set up Google authentication by following [this guide](https://support.google.com/cloud/answer/6158849?hl=en). Lastly, follow [these instructions](https://developer.themoviedb.org/docs/getting-started) and take note of the **API key**, not the bearer token.
2. After completing the above steps, clone the project to your machine and run `npm install` in the root directory.
3. Create `.env` files in `/apps/api` and `/packages/database`. Use the `.env.example` template provided, fill in the corresponding values, and then remove the `.example` extension. Generate a **JWT_SECRET** by running the following command in the console: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
4. Finally, initialize the database by running `npm run db:push`, followed by `npm run db:seed` in the console.

### Running in Development Mode

Navigate to the root of the project and run the command: `npm run dev`.

### Building and Running the Project

Navigate to the root of the project.

Build the project by running `npm run build` in the console, and start the project by running `npm run start`.

### Website and API

The website uses port 3000 and the API uses port 3001. You can access the website on your local machine by going to `localhost:3000` in your browser and make requests to the API at `localhost:3001`.
