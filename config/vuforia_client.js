var vuforia = require('vuforiajs');
const { accessKey,secretKey } = require('../config/config');

var client = vuforia.client({
  'accessKey': accessKey,
  'secretKey': secretKey,
});      

var util = vuforia.util();

module.exports = async (file,width, metaData) => new Promise(
    (resolve, reject) => {
      var targetName = makeid(7);
      var target = {
        'name': targetName,
        'width': width,
        'image': util.encodeFileBase64(file),
        'active_flag': true,
        'application_metadata': util.encodeBase64(metaData)
      };
      
      client.addTarget(target, function (error, result) {
      
        if (error) {
          resolve(error.message);
        } else {
          var resp = {
            targetId : result.target_id,
            targetName :targetName
          };
            resolve(resp);
        }
      });
    }).catch(console.log);

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

