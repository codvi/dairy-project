const mongoose = require('mongoose');

const product = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String, },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative']
        },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative']
    },
    image: {
        type: String,
        required: true
    },
    productID : {
        type: Number,
        unique: true,
        required: true,
        min :[1,"should be atleast 1 digit"],
        max: [999999, "should not be greater than 6 digits"]
    },
    farmer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Farmer', 
        required: true
    }
})


module.exports = mongoose.model('Product', product);

