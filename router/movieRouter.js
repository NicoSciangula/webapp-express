const express = require("express");
const router = express.Router();
const movieController = require("./../controller/movieController");

const {index, show} = movieController;

// * INDEX
router.get("/", index);

// * SHOW
router.get("/:id", show);
