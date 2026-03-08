# requirements-project


const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "./data.csv";

/* ---------------- READ ---------------- */

app.get("/users", (req, res) => {
  const data = fs.readFileSync(FILE, "utf-8");
  const lines = data.split("\n").slice(1);

  const users = lines
    .filter(line => line)
    .map(line => {
      const [id, name, age] = line.split(",");
      return { id, name, age };
    });

  res.json(users);
});

/* ---------------- CREATE ---------------- */

app.post("/users", (req, res) => {
  const { name, age } = req.body;

  const data = fs.readFileSync(FILE, "utf-8");
  const lines = data.split("\n");

  const lastLine = lines[lines.length - 2];
  const lastId = lastLine ? parseInt(lastLine.split(",")[0]) : 0;
  const newId = lastId + 1;

  fs.appendFileSync(FILE, `\n${newId},${name},${age}`);

  res.json({ id: newId, name, age });
});

/* ---------------- UPDATE ---------------- */

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  let data = fs.readFileSync(FILE, "utf-8");
  let lines = data.split("\n");

  lines = lines.map(line => {
    if (line.startsWith(id + ",")) {
      return `${id},${name},${age}`;
    }
    return line;
  });

  fs.writeFileSync(FILE, lines.join("\n"));
  res.json({ id, name, age });
});

/* ---------------- DELETE ---------------- */

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  let data = fs.readFileSync(FILE, "utf-8");
  let lines = data.split("\n");

  lines = lines.filter(line => !line.startsWith(id + ","));

  fs.writeFileSync(FILE, lines.join("\n"));
  res.json({ message: "Deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));