const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Product Schema

const productSchema = new schema({
    
    name:{
        type: String
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Category',
    },
    model:{
        type: String,
        default:""
    },
    productImage:{
        type: String,
        default:""
    },
    scannedImage: {
        type: String,
        default:""
    },
    targetId: {
        type: String,
        default: ""
    },
    targetName: {
        type: String,
        default: ""
    },
    variationFlag:{
        type: String,
        default:""
    },
    // variationId:{
    //     type: mongoose.Schema.Types.ObjectId, ref: 'Variation',
    // },
    description:{
        type: String,
        default:""
    },
    width:{
        type: String,
        default:""
    },
    height:{
        type: String,
        default:""
    },
    price:{
        type: String,
        default:""
    },
    productText:{
        type: String,
        default:""
    },
    productLink:{
        type: String,
        default:""
    },
    scalingFlag:{
        type: String,
        default:""
    },
    defaultScaling:{
        type: String,
        default:""
    },
    autoPlayFlag:{
        type: String,
        default:""
    },
    languageId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Language',
    },
    languageCategoryId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'TranslationCategories',
    },
    state:{
        type: String,
        default:"active"
    },
})


const item= module.exports = mongoose.model('Product',productSchema);