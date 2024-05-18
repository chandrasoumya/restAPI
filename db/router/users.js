const express = require("express");
const User = require("../modals/user");
const Router = express.Router();

// Create
Router.post("/users/",(req,res)=>{
    const newUser = new User(req.body)
    newUser.save()
    .then(()=>{
        res.status(201).send("new user is added")
    })
    .catch((err)=>{
        res.status(400);
        console.error("Error:"+err);
    })
})

// Get by Email
Router.get("/users/:email",(req,res)=>{
    User.findOne({ Email: req.params.email })
    .then((data)=>{
        res.status(200).send(data);
    })
    .catch((err)=>{
        res.status(400);
        console.error("Error:"+err);
    })
})

// Delete by Email
Router.delete("/users/:email", (req, res) => {
    User.findOneAndDelete({ Email: req.params.email })
    .then(() => {
        res.status(200).send("User deleted successfully");
    })
    .catch((err) => {
        res.status(400);
        console.error("Error:" + err);
    });
});

// Update by Email
Router.put("/users/:email", (req, res) => {
    User.findOneAndUpdate({ Email: req.params.email }, req.body, { new: true })
    .then((updatedUser) => {
        res.status(200).send(updatedUser);
    })
    .catch((err) => {
        res.status(400);
        console.error("Error:" + err);
    });
});


module.exports = Router;
