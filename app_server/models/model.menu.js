const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Category Schema

const menuSchema = new schema({
    
    name:{
        type: String
    },
    description:{
        type: String
    },
    icon:{
        type: String,
        default:""
    },
    pageTitle:{
        type: String,
        default:""
    },
    pageText:{
        type: String,
        default:""
    },
    downLeftBtnHyperlink:{
        type: String,
        default:""
    },
    downLeftBtnText:{
        type: String,
        default:""
    },
    downRightConfirmBtnText:{
        type: String,
        default:""
    },
    downRightConfirmBtnIcon:{
        type: String,
        default:""
    },
    state:{
        type: String,
        default:"active"
    },
  
})


const menu= module.exports = mongoose.model('Menu',menuSchema);