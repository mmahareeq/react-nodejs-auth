const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true
    },
    password :{
        type: String,
        required: true,
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editior: Number,
        Admin: Number
    }   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);