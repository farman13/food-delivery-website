const mongoose = require("mongoose");
//const mongoURL = "mongodb+srv://farman32740:f%40rman32740@cluster0.wvi5a.mongodb.net/foodDelivery-app";

const mongoDB = async () => {
    // await mongoose.connect(mongoURL)

    async function fetchCollectionData() {
        try {
            // Access the native MongoDB driver connection
            const db = mongoose.connection.db;

            // Access a specific collection (replace 'yourCollectionName' with your collection's name)
            const collection = db.collection('foodItems');
            const data = await collection.find({}).toArray();  // Query to fetch all documents

            const Categorycollection = db.collection('foodCategory');
            const Categorydata = await Categorycollection.find({}).toArray();

            global.food_items = data;
            global.category_items = Categorydata;
            console.log(global.food_items);  // Print the fetched data
            console.log(global.category_items);
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    fetchCollectionData();
}


module.exports = mongoDB;