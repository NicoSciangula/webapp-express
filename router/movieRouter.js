const express = require("express");
const router = express.Router();
const movieController = require("./../controller/movieController");

// * middleware per salvare le immagini sul server, caricate dal FE
const upload = require("./../middleware/multer");

const {index, show, storeReview, storeMovie} = movieController;

// * INDEX
router.get("/", index);

// * SHOW
router.get("/:id", show);

// * STORE review
router.post("/:id", storeReview);

// * STORE movie
router.post("/", upload.single("image"), storeMovie);

module.exports = router;
