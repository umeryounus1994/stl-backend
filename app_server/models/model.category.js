const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const categorySchema = new schema({
    
    name:{
        type: String
    },
    description:{
        type: String
    },
    category_icon:{
        type: String,
        default:""
    },
    category_default_image:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const category= module.exports = mongoose.model('Category',categorySchema);