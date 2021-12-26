const mongoose = require('mongoose');

const schema = mongoose.Schema;

// Product Schema

var textureFiles = mongoose.Schema({
    imagePath : String,
    createdDate: {
        type: Date,
        default: Date.now
    }
});

const textureSchema = new schema({
    
    name:{
        type: String
    },
    description:{
        type: String
    },
    textureFiles:[textureFiles],
    partId:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Part',
    },
    state:{
        type: String,
        default:"active"
    },
})


const texture= module.exports = mongoose.model('Texture',textureSchema);