const { default: mongoose } = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true, index: true },
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    price: { 
        type: Number,
        required: true 
    },
    isAvailable: { 
        type: Boolean, 
        default: true 
    }}, 
    { timestamps: true });

menuItemSchema.index({ name: 'text', ingredients: 'text' });

const Menu = mongoose.model('Menu', menuItemSchema);

module.exports = Menu;