const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const languageSchema = new schema({
    
    name:{
        type: String
    },
    shortName:{
        type: String
    },
    logo:{
        type: String
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const language= module.exports = mongoose.model('Language',languageSchema);