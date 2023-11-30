const app = require("./app");
const connectToMongo = require('./db');
const port = 5000;
 
connectToMongo();


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});