const {Connection} = require("mysql2");
const connection = require("./../data/db");

// * INDEX
function index(req, res) {
  const sql = "SELECT * FROM movies ";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({error: "Database query failed"});

    const movies = results.map((movie) => {
      return {
        ...movie,
        image: req.imagePath + movie.image,
      };
    });
    res.json(movies);
  });
}

// * SHOW
function show(req, res) {
  const {id} = req.params;
  const movieSql = "SELECT * FROM movies  WHERE id = ?";

  const reviewSql =
    "SELECT name, vote, text, id FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({error: "Database query failed"});
    if (movieResults.length === 0)
      return res.status(404).json({error: "Movie not found"});

    const movie = movieResults[0];

    movie.image = req.imagePath + movie.image;

    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({error: "Database query failed"});

      movie.review = reviewResults;
      res.json(movie);
    });
  });
}

// * STORE review
function storeReview(req, res) {
  const {id} = req.params;
  const {name, vote, text} = req.body;
  const sql =
    "INSERT INTO reviews (name, vote, text, movie_id) VALUES (?, ?, ?, ?)";

  connection.query(sql, [name, vote, text, id], (err, result) => {
    if (err) return res.status(500).json({error: "Database query failed"});
    res.status(201).json({
      message: "Review successfully added",
    });
  });
}

// * STORE movie
function storeMovie(req, res) {
  const {title, director, genre, abstract} = req.body;
  const imageName = `${req.file.filename}`;

  const sql =
    "INSERT INTO movies (title, director, genre, abstract, image) VALUES (?, ?, ?, ?, ?)";

  connection.query(
    sql,
    [title, director, genre, abstract, imageName],
    (err, result) => {
      if (err) return res.status(500).json({error: "Database query failed"});
      res.status(201).json({
        message: "Movie successfully added",
      });
    },
  );
}

module.exports = {index, show, storeReview, storeMovie};
