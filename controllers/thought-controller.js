const { Thought, User } = require('../models');

 const thoughtController = {

  //get all thoughts
   getAllThought(req, res) {
    Thought.find({})
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
   },

   //get a thought by ID
   getThoughtById({ params }, res) {
     Thought.findOne({ _id: params.id })
     .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No Thought found with this ID' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
   },
   //create a new thought
   createThought(req, res) {
    Thought.create(req.body)
    .then(({ _id }) => {
      return User.findOneAndUpdate(
        { _id: req.params.id },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  //update a thought
   updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //delete a thought
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },
  //add a reaction to a thought
   createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},  
      { $push: { reactions: body } }, 
      { new: true })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },
  //delete a reaction
   deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }

 }



module.exports = thoughtController;