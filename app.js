const express = require("express");
const app = express();
const port = 3000;

// * Importato il router
const movieRouter = require("./router/movieRouter");

app.use(express.json());

app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto sul mio sito!");
});

app.listen(port, () => {
  console.log("Il mio server!");
});
