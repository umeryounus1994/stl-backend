var texture =require('../models/model.texture.js');

// Get Category By Id
module.exports.getTextureById = (id ,callback) =>  {
	texture.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllTextures = (callback) =>  {
	texture.find(callback)
    .populate('partId');
}

module.exports.getAllTexturesByPartsId = (partsId ,callback) =>  {
	texture.find({partId: partsId}, callback);
}

// Add Category
module.exports.addTexture = async (categoryForm, callback) => {
	texture.create(categoryForm, callback);
}


// Update Category
module.exports.updateTexture = async (categoryId, categoryForm, options, callback) => {
	var query = {_id: categoryId};
	texture.findOneAndUpdate(query,categoryForm,options, callback);
}



// Delete Category   
module.exports.removeTexture = (id, callback) => {
    var query = {_id: id};
    texture.remove(query, callback)
}
