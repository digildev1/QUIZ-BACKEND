const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Name: String,
    AdminId: {
        type: String,
        unique: true,
    },
    role: {
        type: Number,
        default: 1
    },

    Password: String,
    Gender: String,
    MobileNumber: String,
    Mrs: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Mr' }
    ]
})

module.exports = mongoose.model('admin', adminSchema)