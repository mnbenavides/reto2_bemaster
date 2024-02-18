//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let commentSchema = new Schema({

  text_comment: {
    type: String,
    required: [true, 'comment^s text field is required'],
  },

  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
  },

  user_email: {
    type: String,
    required: [true, 'User^s email field is required'],
  },

  state: {
    type: Number,
    required: [true, 'Last name field is required'],
    default: 1,
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

commentSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('comment', commentSchema);