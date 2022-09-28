const { Schema, model, Types } = require('mongoose');



const ReactionSchema = new Schema(
    {
     // set custom id to avoid confusion with parent comment _id
     reactionId: {
       type: Schema.Types.ObjectId,
       default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        trim: true
      },
      writtenBy: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        }
      },
      {
        toJSON: {
          getters: true
        }
      }
  );

const ThoughtSchema = new Schema({
  writtenBy: {
    type: String,
    required: true,
  },
  thoughtBody: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // use ReactionSchema to validate data for a reaction
  reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);

// get total count of thoughts and reactions on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;