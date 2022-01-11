const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Product Schema

const partSchema = new schema({
    
    name:{
        type: String
    },
    description:{
        type: String
    },
    imageFile:{
        type: String
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Product',
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


const part= module.exports = mongoose.model('Part',partSchema);