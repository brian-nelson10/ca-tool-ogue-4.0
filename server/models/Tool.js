const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

//add tools create id .. toolcat pulls id from here along with name ect
const toolSchema = new Schema(
  {
    toolName: {
      type: String,
      required: 'You need to leave a tool!',
      minlength: 1,
      maxlength: 20
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    checkedInBy: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    notes: [noteSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

toolSchema.virtual('noteCount').get(function() {
  return this.notes.length;
});

 const Tool = model('Tool', toolSchema);

module.exports = Tool;

