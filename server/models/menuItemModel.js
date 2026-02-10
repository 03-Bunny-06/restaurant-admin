const { default: mongoose } = require("mongoose");

const menuItemSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        index: true 
    },
    description: String,
    category: {
        type: String,
        enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
        required: true
    },
    price: { 
        type: Number,
        required: true 
    },
    ingredients: [{
        type: String,
        lowercase: true,
        trim: true
    }],
    isAvailable: { 
        type: Boolean,
        required: true,
        default: true 
    },
    preparationTime: {
        type: Number,
        required: true
    },
    imageLink : {
        type: String,
        required: true,
        default: 'https://github.com/Kowshik-8055/restaurant-images/blob/main/default.png?raw=true'
    }},
    { 
        timestamps: true 
    });

menuItemSchema.index({ name: 'text', ingredients: 'text' });

const Menu = mongoose.model('Menu', menuItemSchema);

module.exports = Menu;