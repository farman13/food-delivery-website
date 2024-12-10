const { Router } = require("express");
const displayRouter = Router();

displayRouter.get('/fooddata', (req, res) => {
    try {
        res.send([global.food_items, global.category_items])
    } catch (e) {
        console.log("Error while sending globalFood_items from displayData.js :", e.message);
        res.send("Server Error");
    }
})

module.exports = {
    displayRouter: displayRouter
}