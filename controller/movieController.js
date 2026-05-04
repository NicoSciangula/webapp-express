const connection = require("./../data/db");

function index(req, res) {
  res.send("lista film");
}

function show(req, res) {
  res.send(`Il film che hai selezionato è il ${req.params.id}`);
}

module.exports = {index, show};
