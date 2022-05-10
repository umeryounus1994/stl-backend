var texture =require('../models/model.texture.js');

// Get Category By Id
module.exports.getTextureById = (id ,callback) =>  {
	texture.find({_id:id}, callback);
}

// Get All Categories
module.exports.getAllTextures = (callback) =>  {
	texture.find({state:"active"},callback)
    .populate('partId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
}

module.exports.getAllTexturesByPartsId = (partsId,languageId,categoryId ,callback) =>  {
	texture.find({partId: partsId,languageId:languageId,categoryId:categoryId,state:"active"}, callback)
	.populate('partId')
	.populate('languageId',{ name: 1, shortName:1 })
	.populate('categoryId','name');
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
