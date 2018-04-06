'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
let bucketName = 'minispotifybucket';

module.exports.getfile = (event, context, callback) => {

  if (!event.key) {
    let params = {
      Bucket: bucketName,
      MaxKeys: 10
    };
    s3.listObjectsV2(params, function (error, data) {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Couldn\'t insert delete record in database.',
        });
        return;
      } else {
        const response = {
          statusCode: 200,
          body: JSON.stringify(data.Contents),
        };
        callback(null, response);
      }
    });

  } 
  else {

    let params = {
      Bucket: bucketName,
      Key: event.key
    };

    s3.getObject(params, function (error, data) {
      if (error) {
        console.error(error);
        callback(null, {
          statusCode: error.statusCode || 501,
          headers: {
            'Content-Type': 'text/plain'
          },
          body: 'Couldn\'t insert delete record in database.',
        });
        return;
      } else {
        const response = {
          statusCode: 200,
          body: JSON.parse(data.ETag),
        };
        callback(null, response);
      }

    });
  }


};