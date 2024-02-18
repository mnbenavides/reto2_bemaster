//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let reviewSchema = new Schema({

  score: {
    type: Number,
    required: [true, 'Score field is required'],
    min: 1,
    max: 5,
    default: 0
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'video',
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

reviewSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('review', reviewSchema);