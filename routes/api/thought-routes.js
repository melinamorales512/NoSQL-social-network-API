const router = require('express').Router();

const {
  getThoughts,
  getThoughtById,
  addThought,
  updateThought,
  removeThought,
  addReaction,
  
} = require('../../controllers/thought-controller');


router
  .route('/').get(getThoughts).post(addThought);

router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction);

router
  .route('/:thoughtId/reactions/:reactionId')


module.exports = router;