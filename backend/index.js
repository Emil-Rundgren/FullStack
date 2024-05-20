const express = require("express");
path = require("path");
const sqlite3 = require("sqlite3").verbose();

const app = express();

// öpnna anslutning till DB
const db = new sqlite3.Database(path.resolve(__dirname, "test.sqlite"));

// app.get("/api", (_request, response) => {
//   response.send({ hello: "World" });
// });

// Endpoint för att hämta all data från databasen
app.get("/cities", (req, res) => {
  db.all("SELECT * FROM cities", (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Databbase error");
      return;
    }
    res.json(rows);
  });
});

// Middleware för att läsa filer med express från mappen dist
app.use(express.static(path.join(path.resolve(), "dist")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Redo på http://localhost:${PORT}`);
});
