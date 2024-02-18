//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let roleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    state: {
        type: Number,
        required: [true, 'Sate field is required'],
        default: 1
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

roleSchema.plugin(uniqueValidator, { message: '{PATH} must be unique' });
module.exports = mongoose.model('role', roleSchema);