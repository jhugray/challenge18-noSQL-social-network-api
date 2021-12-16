const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/
    },
    thoughts: [
      {
       type: Schema.Types.ObjectId,   //check this
       ref: 'Thought' 
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, //check this
        ref: 'User' 
      }

    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
)

UserSchema.virtual('friendCount').get(function() { // check this
  return this.friends.length;
})

const User = model('User', UserSchema);
module.exports = User;