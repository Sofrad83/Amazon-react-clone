const express = require("express");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

app.get("/products", (req, res) => {
  const products = [];

  fs.createReadStream(path.join(__dirname, "products.csv"))
    .pipe(csv())
    .on("data", (row) => {
      products.push(row);
    })
    .on("end", () => {
      res.json(products);
    });
});

app.listen(PORT, () => {
  console.log(`Serveur started on http://localhost:${PORT}`);
});
