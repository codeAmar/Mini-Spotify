'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
let tableName = 'SpotifyTable';
let bucketName = 'minispotifybucket';

module.exports.deletefile = (event, context, callback) => {

  const timestamp = new Date().getTime();

  const params = {
    TableName: tableName,
    Item: {
      id: uuid.v1(),
      filename: event.key,
      createdAt: timestamp
    },
  };


  s3.deleteObject({
    Bucket: bucketName,
    Key: event.key
  }, function (err) {
    if (err) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'text/plain'
        },
        body: 'Couldn\'t delete file from bucket.',
      });
      return;
    } else {

      dynamoDb.put(params, (error) => {
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
        }
        const response = {
          statusCode: 200,
          body: JSON.stringify(params.Item),
        };
        callback(null, response);
      });
    }
  });

};