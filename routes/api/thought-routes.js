const router = require('express').Router();
const { getAllThoughts,
        getThoughtById,
        addThought, 
        removeThought,
        addReaction,
        removeReaction
     } = require('../../controllers/thought-controller');

// GET all thoughts at /api/thoughts
router
    .route('/')
    .get(getAllThoughts);

// GET one thought at /api/thoughts/:thoughtId
router
  .route('/:thoughtId')
  .get(getThoughtById);
          
// /api/thoughts/<userId>
router.route('/:userId')
    .post(addThought);

// /api/thoughts/<userId>/<thoughtId>
router.route('/:userId/:thoughtId')
.put(addReaction)
.delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);



module.exports = router;