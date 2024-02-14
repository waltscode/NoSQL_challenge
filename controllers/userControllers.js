const { User, Thought } = require('../models');

module.exports = {

    async getUsers(req, res) {
        try {
            const users = await User.find({});
            res.json(users);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },      
    async getUserById({ params }, res) {
        try {
            const user = await User.findOne({ _id: params.id }).populate('thoughts').populate('friends');
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async createUser({ body }, res) {
        try {
            const user = await User.create(body);
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async updateUser({ params, body }, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: params.id },
                body, { new: true, runValidators: true });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteUser({ params }, res) {
        try {
            const user = await User.findOneAndDelete({ _id: params.id });
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async addFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async deleteFriend({ params }, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: params.userId },
                { $pull: { friends: params.friendId } },
                { new: true }
            );
            if (!user) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    
    
};