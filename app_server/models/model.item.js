const mongoose = require('mongoose');

const schema = mongoose.Schema;

// item Schema

const itemSchema = new schema({
    
    name:{
        type: String
    },
    item_image:{
        type: String,
        default:""
    },
    item_modal:{
        type: String,
        default:""
    },
    sub_category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory',
    },
  
})


const item= module.exports = mongoose.model('Item',itemSchema);