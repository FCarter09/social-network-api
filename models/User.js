const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
    userName: {
        type: String,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        trim: true,
    },
    // associate thoughts to user
    thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
    // associate friends to user
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
    },
    
    {// tell schema to use virtual
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
    }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.reduce((total, thought) => total + thought.reactions.length + 1, 0);
  });

// get total count of friends of user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User Model
module.exports = User;