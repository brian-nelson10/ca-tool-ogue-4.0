const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const toolListSchema = require('./ToolList');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 4
    },
    //set savedTools to be an array of data that adheres to the toolListSchema
    savedTools: [toolListSchema],
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return bcrypt.compare(password, this.password);
};
// when we query a user, we'll also get another field called `toolCount` 
//with the number of saved tools we have
userSchema.virtual('toolCount').get(function() {
  return this.savedTools.length;
});

const User = model('User', userSchema);

module.exports = User;
