const { Schema, model } = require('mongoose');
const noteSchema = require('./Note');
const dateFormat = require('../utils/dateFormat');

//add tools create id .. toolList pulls id from here along with name ect
//add tools with tool form 
//submit them to homepage , array as cards 


const toolSchema = new Schema(
  {
    toolName: {
      type: String,
      required: 'You need to leave a tool!',
      minlength: 1,
      maxlength: 20
    },
    toolId: {
        type: String,
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

