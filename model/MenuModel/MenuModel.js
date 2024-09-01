const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        recipe: { type: String, required: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        price: { type: Number, required: true },
        rating: { type: Number, min: 0, max: 5, default: 0 },
    },
    { timestamps: true }
);

const MenuModel = mongoose.model("menus", menuSchema);
module.exports = MenuModel;
