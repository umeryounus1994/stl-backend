const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Product Schema

const translationcategory = new schema({
    
    name:{
        type: String
    },
    state:{
        type: String,
        default:"active"
    },
})


const translationcategories= module.exports = mongoose.model('TranslationCategories',translationcategory);