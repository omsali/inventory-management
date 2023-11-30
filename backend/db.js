const mongoose = require('mongoose');
const MongoURI = "mongodb://localhost:27017/pune-pumps";
const connectToMongo = () => {
    mongoose.connect(MongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then((data) => {
            console.log(`Database Connected Sucessfully ${data.connection.host}`);
        })
        .catch((error) => console.log("Error on connecting", error));
};

module.exports = connectToMongo;