const express = require("express");
const router = express.Router();
const movieController = require("./../controller/movieController");

const {index, show, storeReview} = movieController;

// * INDEX
router.get("/", index);

// * SHOW
router.get("/:id", show);

// * STORE review
router.post("/:id", storeReview);

module.exports = router;
