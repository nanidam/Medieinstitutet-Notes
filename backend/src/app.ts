import express, { Application, Request, Response } from "express";
import usersRouter from "../routes/users.js";
import notesRouter from "../routes/notes.js";

import cors from "cors";
import logger from "morgan";
import path from "path";
import cookieParser from "cookie-parser";

const app: Application = express();
const port = 3000;

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const publicPath = path.resolve(new URL(import.meta.url).pathname, "..", "public");

app.use(cors());
app.use(express.static(publicPath));
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log(port);
});
