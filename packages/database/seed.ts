import * as dotenv from "dotenv";
import { db } from "./database";
import { listTypes } from "./schema";
dotenv.config({ path: "./.env.development" });

if (!("DATABASE_URL" in process.env))
  throw new Error("DATABASE_URL not found on .env.development");

db.insert(listTypes)
  .values([
    { id: 1, name: "completed" },
    { id: 2, name: "plan to watch" },
    { id: 3, name: "dropped" },
  ])
  .onConflictDoNothing()
  .then(() => {
    console.log("Succesfully seeded");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
