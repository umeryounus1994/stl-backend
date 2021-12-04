const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
var path = require('path');

aws.config.update({
  secretAccessKey: 'JC8CcOK5WLf5zQIoFCarD1scIu/UDeEfLZYbDLn7',
  accessKeyId: 'AKIATJXFX2IAS6JVVJGA',
  region: 'us-east-1'
  });

  const s3 = new aws.S3();


  const upload = multer({
    storage: multerS3({
      acl: 'public-read',
      s3,
      bucket: 'noi4-trees',
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


// file store to localstorage

    // const storage = multer.diskStorage({
    //     destination: function(req, file, cb){
    //         cb(null, __basedir + '/profile/');
    //     },
    //     filename: function(req, file, cb) {
        
    //         var fileName = file.originalname.toLowerCase();
    //         cb(null, file.fieldname.toLowerCase() + '-' +  Date.now() + fileName.trim())
    //     }
    // });
    // const upload = multer({storage: storage});

    module.exports = upload;