const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Sub Category Schema

const subCategorySchema = new schema({
    
    name:{
        type: String
    },
    sub_category_image:{
        type: String,
        default:""
    },
    category_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    },
  
})


const subCategory= module.exports = mongoose.model('SubCategory',subCategorySchema);