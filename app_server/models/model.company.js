const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const companySchema = new schema({
    
    name:{
        type: String
    },
    logo:{
        type: String
    },
    introVideo:{
        type: String,
        default:""
    },
    hyperlink:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const company= module.exports = mongoose.model('Company',companySchema);