import express from "express";
import { connection } from "../src/connections.js";
import type { INote } from "../src/models/interfaces.js";

const router = express.Router();

//Add note
router.post("/add", async (req, res) => {
  const newNote = req.body;

  try {
    await connection.query("INSERT INTO `notes`(`title`, `body`, `user`) VALUES ( ?, ?, ?)", [newNote.title, newNote.body, newNote.user]);
    res.status(200).json("Note added!");
  } catch (error) {
    console.log("error", error);
    res.status(500).json("Failed to add note. Try again :( ");
  }
});

// Get notes from specific user
router.get("/:user", async (req, res) => {
  const { user } = req.params;

  try {
    const [rows] = await connection.query("SELECT * FROM notes WHERE user = ?", [user]);
    const blobNotesList = rows as INote[];
    const blobNotes = blobNotesList.map((row: INote) => ({
      postID: row.postID,
      title: row.title.toString(),
      body: row.body.toString(),
      user: row.user,
      deleted: row.deleted,
    }));

    // De-blobbing
    blobNotes.forEach((note) => {
      Buffer.from(note.title).toString();
      Buffer.from(note.body).toString();
    });

    res.status(200).json(blobNotes);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Edit note
router.post("/edit", async (req, res) => {
  const { postID, title, body } = req.body;

  try {
    await connection.query("UPDATE notes SET title = ?, body = ? WHERE postID = ?", [title, body, postID]);

    res.status(201).json("Note updated successfully!");
  } catch (error) {
    console.error(error);
    res.status(400).json("Could not edit note.");
  }
});

//"Delete" note by changing deleted in db
router.post("/delete", (req, res) => {
  const { postID, deleted } = req.body;

  try {
    connection.query("UPDATE notes SET deleted = ? WHERE postID = ?", [deleted, postID]);

    res.status(201).json("Note deleted!");
  } catch (error) {
    console.error(error);
    res.status(400).json("Could not delete note :(.");
  }
});

export default router;
