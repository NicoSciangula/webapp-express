const connection = require("./../data/db");

function index(req, res) {
  const sql = "SELECT * FROM movies ";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({error: "Database query failed"});
    res.json(results);
  });
}

function show(req, res) {
  const {id} = req.params;
  const movieSql = "SELECT * FROM movies  WHERE id = ?";

  const reviewSql = "SELECT name, vote, text FROM reviews WHERE movie_id = ?";

  connection.query(movieSql, [id], (err, movieResults) => {
    if (err) return res.status(500).json({error: "Database query failed"});
    if (movieResults.length === 0)
      return res.status(404).json({error: "Movie not found"});

    const movie = movieResults[0];

    connection.query(reviewSql, [id], (err, reviewResults) => {
      if (err) return res.status(500).json({error: "Database query failed"});

      movie.review = reviewResults;
      res.json(movie);
    });
  });
}

module.exports = {index, show};
