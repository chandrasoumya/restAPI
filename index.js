const express = require("express");
const app = express();
const cors = require("cors")
const port =process.env.port || 5000;
const UserRouter = require("./db/router/users");
const PostRouter = require("./db/router/posts");

app.use(express.json());
app.use(cors());

// database connection
require("./db/conn");

// CRUD operation
app.use(UserRouter);
app.use(PostRouter);


app.listen(port,()=>{
    console.log("server is live on "+port);
})