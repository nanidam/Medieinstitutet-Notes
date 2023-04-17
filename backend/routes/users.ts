import express from "express";
import { connection } from "../src/connections.js";
import type { IUser } from "../src/models/interfaces.js";

const router = express.Router();

// Get a user
router.get("/", async (req, res) => {
  const { name } = req.body;

  try {
    const result = await connection.query("SELECT * FROM user WHERE name = ?", [name]);
    res.status(200).json(result[0]);
  } catch (error) {
    console.log("error", error);
    res.status(500).json("Failed to get user from database");
  }
});

// Add user
router.post("/add", async (req, res) => {
  const newUser = req.body;

  try {
    await connection.query("INSERT INTO `user`(`name`, `mail`, `password`) VALUES (?, ?, ?)", [newUser.name, newUser.mail, newUser.password]);
    res.status(200).json("User added successfully");
  } catch (error) {
    console.log("error", error);
    res.status(500).json("Failed to add user to database");
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const [result] = await connection.query("SELECT * FROM user WHERE name = ?", [name]);

  if (Array.isArray(result)) {
    if (result.length === 0) {
      return res.status(404).json("User not found.");
    }

    const findUser = result[0] as IUser;

    //Check users input with db
    if (findUser.name === name && findUser.password === password) {
      return res.status(200).json("Login successful!");
    }
  }
  return res.status(400).json("Incorrect username or password. Please try again.");
});

export default router;
