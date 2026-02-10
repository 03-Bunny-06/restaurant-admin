const mongoose = require("mongoose");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet('1234567890', 6);

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        immutable: true,
        unique: true,
        default: () => `ORD-${nanoid()}`
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
            },
            quantity: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
    },
    customerName: {
        type: String,
        required: true
    },
    tableNumber: {
        type: Number,
        required: true
    }
    }, 
    {
        timestamps: true
})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;