const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');
const { awsSecretKey,awsAccessKey,awsRegion } = require('../config/config');

aws.config.update({
  secretAccessKey: awsSecretKey,
  accessKeyId: awsAccessKey,
  region: awsRegion
  });

  const s3 = new aws.S3();


  const upload = multer({
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'stl3-app',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: 'TESTING_METADATA'});
      },
      key: function (req, file, cb) {
        var fileName = file.originalname.toLowerCase();
        cb(null, Date.now().toString()+fileName)
      }
    })
  });

    module.exports = upload;