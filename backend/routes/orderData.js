const { orderModal } = require("../models/Schemas");
const { Router } = require("express");
const OrderRouter = Router();


OrderRouter.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    data.splice(0, 0, { Order_date: req.body.order_date });

    console.log("1231242343242354", req.body.email);

    try {
        let eId = await orderModal.findOne({ email: req.body.email });
        console.log(eId);

        if (eId === null) {
            // Create new order if email doesn't exist
            console.log(data);
            console.log("1231242343242354", req.body.email);
            await orderModal.create({
                email: req.body.email,
                order_data: [data],
            });
            res.status(200).json({ success: true });
        } else {
            // Update existing order
            await orderModal.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: data } }
            );
            res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

OrderRouter.get('/myOrderData', async (req, res) => {
    try {
        // Extract email from query parameters
        const email = req.query.email;
        console.log(email);

        // Find order data based on email
        const eId = await orderModal.findOne({ email });

        if (!eId) {
            return res.status(404).json({ message: "No orders found for this email." });
        }

        res.status(200).json({ orderData: eId });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error: " + error.message);
    }

});

module.exports = {
    OrderRouter,
};
