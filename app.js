const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT;

// * Middleware per il CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);

// * Importato il router
const movieRouter = require("./router/movieRouter");

// * Middleware custom per errori
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");

app.use(express.json());

app.use("/api/movies", movieRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto sul mio sito!");
});

app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log("Il mio server!");
});
