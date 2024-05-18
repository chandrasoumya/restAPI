const mongoose = require("mongoose");

// Connecting to the database
mongoose.connect("mongodb://localhost:27017/nodeTask", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database is connected");
}).catch((err) => {
    console.log(err);
});
