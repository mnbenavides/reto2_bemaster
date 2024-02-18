//Importaciones
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let videoSchema = new Schema({

    title: {
        type: String,
        required: [true, 'Title field is required']
    },

    description: {
        type: String,
        required: [true, 'Description field is required']
    },

    uploader_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },

    date_publication: {
        type: Date,
        required: [true, 'Date publication field of video  is required']
    },
    
    likes: {
        type: Number,
        default:0
    },

    users_liked: [{
        email: {
            type: String,
        },
        user_name: {
            type: String,
        }
    }],

    is_private: {
        type: Boolean,
        default: false
    },

    state: {
        type: Number,
        required: [true, 'State field is required'],
        default: 1
    },
    
    author: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }],

    collaborator: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    }],

    created_at: {
        type: Date,
        default: Date.now
    }
});

videoSchema.plugin(uniqueValidator, { message: '{PATH} debe ser único' });
module.exports = mongoose.model('video', videoSchema);