const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const variationSchema = new schema({
    
    name:{
        type: String
    },
    description:{
        type: String
    },
    reference_image:{
        type: String,
        default:""
    },
    model_image:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const variation= module.exports = mongoose.model('Variation',variationSchema);