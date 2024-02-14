const {Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min: 1,
            max: 280
        },

        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => createdAtVal.toDateString()
        },

        username: {
            type: String,
            required: true
        },

        reactions: [
            reactionSchema
        ]
    },

    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;