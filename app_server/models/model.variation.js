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


const variation= module.exports = mongoose.model('Variation',variationSchema);