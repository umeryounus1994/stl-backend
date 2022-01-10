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
    languageId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Language',
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'TranslationCategories',
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const category= module.exports = mongoose.model('Category',categorySchema);