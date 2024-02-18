//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let resetPassSchema = new Schema({
    expiration_date: {
        type: Date,
        required: [true, 'Expiration date field of token  is required']
    },
    date_created: {
        type: Date,
        required: [true, 'Created date field of token  is required']
    },
    token: {
        type: Number,
        required: [true, 'Token field is required']
    },
    email_user: {
        type: String,
        required: [true, 'user^s email  field is required']
    },
    is_valid: {
        type: Boolean,
        default: true

    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
resetPassSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('resetPass', resetPassSchema);