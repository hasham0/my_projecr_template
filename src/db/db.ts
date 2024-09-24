import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

client.connect().catch((err) => {
  console.log("client err => ", err);
});

const db = drizzle(client);

export { db };
