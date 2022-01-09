const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Product Schema

const translationSchema = new schema({   
    translatedText:{
        type: String
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


const translation= module.exports = mongoose.model('Translation',translationSchema);