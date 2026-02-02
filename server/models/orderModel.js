const { default: mongoose } = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        immutable: true,
        unique: true,
        default: () => `ORD-$${uuidv4()}`
    },
    items: [
        {
            menuItem: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'menu',
            },
            quantity: Number,
            price: Number
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled']
    },
    customerName: String,
    tableNumber: Number
}, {timestamps: true})

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;