const router = require('express').Router();
const {
  getAllThought,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction
} = require('../../controllers/comment-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought)

// /api/thoughts/:id
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// /api/thoughts/:thoughtID/reactions
router  
  .route('/:thoughtID/reactions')
  .post(createReaction)
  .delete(deleteReaction);


module.exports = router;