const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    Username:{
        type: String,
        required: true, 
    },
    Desc:{
        type: String,
    },
    Img:{
        type: String,
    },
    Likes:{
        type:Array,
        default:[],
    },
    Comments:{
        type:Array,
        default:[],
    },

});

const Post = mongoose.model("posts",postSchema);

module.exports = Post;