const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model 
//but we'll use it as the schema for the User's `savedTools` array in User.js
//grab tools from tool.js
//ref bookschema
//create tools just like users. keep them here
const toolListSchema = new Schema({
  toolName: [
    {
      type: String,
    },
  ],
  // saved tool id from Tool.js
  toolId: {
    type: String,
    required: true,
  },
});

module.exports = toolListSchema;
