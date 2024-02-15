
const { Thought, User } = require('../models');

module.exports = {

    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // get thought by id
    async getThoughtById({ params }, res) {
        try {
            const thought = await Thought.findOne({ _id: params.id });
            if (!thought) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    // create thought
    async createThought({ body }, res) {
        try {
            const thought = await Thought.create(body);
            const user = await
                User.findOneAndUpdate(

                    { _id: body.userId },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    // update thought
async updateThought({ params, body }, res) {
    try {
        const thought = await Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

// delete thought
async deleteThought({ params }, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: params.id });
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

// add reaction

async addReaction({ params, body }, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
},

// delete reaction
async deleteReaction({ params }, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json(thought);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
}
};





