const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, default: Date.now }
})


const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

const userModal = mongoose.model("users", userSchema);
const orderModal = mongoose.model('orders', OrderSchema)

module.exports = {
    userModal,
    orderModal
}