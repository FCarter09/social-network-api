const { Schema, model } = require('mongoose');


const UserSchema = new Schema(
    {
    userName: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    userEmail: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
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

// get total count of thoughts and reactions on retrieval
UserSchema.virtual('thoughtCount').get(function() {
    return this.thoughts.length;
  });

// get total count of friends of user
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

// create the User model using the UserSchema
const User = model('User', UserSchema);

// export the User Model
module.exports = User;