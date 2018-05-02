require('dotenv').config();
const aws = require('aws-sdk');

// const config = require('../config');


const S3_BUCKET = process.env.S3_BUCKET;

aws.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey
})
aws.config.region = 'us-west-1';

const getSignedURL = (req, res) => {
  const { filename, filetype } = req.body;
  const s3 = new aws.S3();
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: filename,
    Expires: 60,
    ContentType: filetype
    // ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
    };
    // console.log(returnData)
    res.status(200).send(returnData)
  });
}

module.exports = {getSignedURL}