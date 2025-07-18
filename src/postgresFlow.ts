import { genkit, z } from "genkit";
import { Client } from "pg";

// Define input schema for the database flow
const DbInputSchema = z.object({
  user: z.string(),
  host: z.string(),
  database: z.string(),
  password: z.string(),
  port: z.number(),
});

// Define the PostgreSQL flow
export const postgresFlow = genkit.defineFlow(
  {
    name: "postgresFlow",
    inputSchema: DbInputSchema,
    outputSchema: z.any(),
  },
  async (input) => {
    const client = new Client({
      user: input.user,
      host: input.host,
      database: input.database,
      password: input.password,
      port: input.port,
    });

    try {
      await client.connect();
      const res = await client.query("SELECT NOW()");
      return res.rows[0];
    } finally {
      await client.end();
    }
  }
);
