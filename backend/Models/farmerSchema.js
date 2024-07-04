const mongoose = require('mongoose');
const { isEmail } = require('validator');

const farmerSchema = new mongoose.Schema({
    farmerName: {
        type: String,
        required: [true, 'Farmer name is required'],
        minlength: [3, 'Farmer name must be at least 3 characters long'],
        maxlength: [50, 'Farmer name must be at most 50 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: isEmail,
            message: 'Please enter a valid email',
        },
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /\d{10}/.test(v);
            },
            message: 'Phone number must be 10 digits',
        },
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minlength: [10, 'Address must be at least 10 characters long'],
        maxlength: [100, 'Address must be at most 100 characters long'],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    }
});

module.exports = mongoose.model('Farmer', farmerSchema);
