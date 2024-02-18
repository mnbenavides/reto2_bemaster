//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let userSchema = new Schema({

  name_user: {
    type: String,
    required: [true, 'User field is required'],
  },

  password: {
    type: String,
    select: false,
    min: [6, 'Password must be longer than 6 characters'],
    max: [15, 'The password must not be longer than 15 characters.'],
    required: [true, 'Password field is required'],
  },

  email: {
    type: String,
    required: [true, 'Email field is required'],
    unique: true
  },

  full_name: {
    type: String,
    required: [true, 'Full name field is required'],
  },

  last_name: {
    type: String,
    required: [true, 'Last name field is required'],
  },

  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'role',
  },

  phone: {
    type: String,
    required: [true, 'Phone field is required'],
  },

  last_password_change: {
    type: Date,
    default: Date.now
  },

  state: {
    type: Number,
    required: [true, 'Last name field is required'],
    default: 1,
  },
  
  country_code: {
    type: Number,
    default: 57,
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

userSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
//Elimina la contraseña de el json que se retorna
userSchema.set('toJSON', {
  transform: function (doc, ret, opt) {
    delete ret['password'];
    return ret;
  },
});
module.exports = mongoose.model('user', userSchema);