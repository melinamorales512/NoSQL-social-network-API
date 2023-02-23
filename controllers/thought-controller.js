const { Thought, User } = require('../models');

const thoughtController = {
  
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  
  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((Thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  addThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  
  removeThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Student.deleteMany({ _id: { $in: thought.user } })
      )
      .then(() => res.json({ message: 'Thougth and user deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      {_id: params.thoughtId}, 
      {$push: {reactions: body}}, 
      {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({message: 'No thoughts with this ID.'});
            return;
        }
        res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err))
},

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController