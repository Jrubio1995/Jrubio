// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8080;
const main = path.join(__dirname, "/public");

// Request Handlers
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//===========================================

app.get("/notes", function (req, res) {
  res.sendFile(path.join(main, "notes.html"));
});

app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  var savedNote = JSON.parse(fs.readFileSync("db/db.json"));
  res.json(savedNote[Number(req.params.id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(main, "index.html"));
});

//===========================================================
// Adding Saved Note
app.post("/api/notes", function (req, res) {
  var savedNote = JSON.parse(fs.readFileSync("db/db.json"));
  var newNote = req.body;
  var uniqueID = savedNote.length.toString();
  newNote.id = uniqueID;
  savedNote.push(newNote);

  fs.writeFileSync("db/db.json", JSON.stringify(savedNote));
  console.log("Note saved to db.json. Content: ", newNote);
  res.json(savedNote);
});

app.delete("/api/notes/:id", function (req, res) {
  var savedNote = JSON.parse(fs.readFileSync("db/db.json"));
  var note = req.params.id;
  var newText = 1;
  // Clicking through Previous Notes
  savedNote = savedNote.filter((savedText) => {
    return savedText.id != note;
  });

  for (savedText of savedNote) {
    savedText.id = newText.toString();
    newText++;
  }

  fs.writeFileSync("db/db.json", JSON.stringify(savedNote));
  res.json(savedNote);
});
// Could be shorten to something like: app.delete("/api/notes/:id", function(req, res) {
//note.splice(req.params.id, 1);
//updateFile();
//But couldnt get it to work

//===========================================================
// Starts server to begin listening to the port
app.listen(PORT, function () {
  console.log("App is listening on PORT# " + PORT);
});
