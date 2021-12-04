const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const categorySchema = new schema({
    
    name:{
        type: String
    },
    category_image:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const category= module.exports = mongoose.model('Category',categorySchema);