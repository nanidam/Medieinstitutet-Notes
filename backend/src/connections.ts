import { createConnection } from "mysql2/promise";

export const connection = await createConnection({
  host: "localhost",
  port: 3306,
  user: "notesAdmin",
  password: "fed22d",
  database: "notes",
});
