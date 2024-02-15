const router = require('express').Router();

const { getThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtControllers');

// /api/thoughts
router
  .route('/')
  .get(getThoughts)
  .post(createThought);

    router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

    router.route('/:thoughtId/reactions')
    .post(addReaction)
    .delete(deleteReaction);

    module.exports = router;