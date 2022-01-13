var vuforia = require('vuforia-api');
const { serverAccessKey,serverSecretKey } = require('../config/config');

var client = vuforia.client({
  'serverAccessKey': serverAccessKey,
  'serverSecretKey': serverSecretKey,
  // 'clientAccessKey': clientAccessKey,
  // 'clientSecretKey': clientSecretKey
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
      console.log('errr', error);
        if (error) {
          resolve(error.message);
        } else {
          console.log('resss',result);
          var resp = {
            targetId : result.target_id,
            targetName :targetName
          };
            resolve(resp);
        }
      });
    }).catch("logs are here",console.log);

    function makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
  }

