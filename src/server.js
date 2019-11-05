const express = require("express");
const db = require("./db");

const PORT = process.env.PORT || 3001;
const app = express();

app.get("/api/users", async (req, res, next) => {
  try {
    const users = await db.User.find(req.query).populate("notes");
    res.json({ users: users.map(user => user.toObject({ virtuals: true })) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id).populate("notes");
    res.json({ user: user.toObject({ virtuals: true }) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/users/:id/longest-note", async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.id);
    const longestNote = await user.longestNote();
    res.json({ note: longestNote });
  } catch (error) {
    next(error);
  }
});

app.get("/api/notes", async (req, res, next) => {
  try {
    const notes = await db.Note.find(req.query);
    res.json({ notes });
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => console.log(`🌎 App listening on PORT ${PORT}`));
