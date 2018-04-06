'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
let bucketName = 'minispotifybucket';
let tableName = 'PlaylistTable';
let timestamp = new Date().getTime();

module.exports.createplaylist = (event, context, callback) => {

    if (!event.key || !event.playlist) {
        callback(null, {
            statusCode: error.statusCode || 501,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: 'make sure you pass key and playlist paramters with request.',
        });
    } else {

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
                    body: 'Couldn\'t find record in S3 bucket.',
                });
                return;
            } else {
                dynamoDb.put({
                    TableName: tableName,
                    Item: {
                        fileName: event.key,
                        playListName: event.playlist,
                        createdAt: timestamp
                    },
                }, (error) => {
                    if (error) {
                        callback(null, {
                            statusCode: error.statusCode || 501,
                            headers: {
                                'Content-Type': 'text/plain'
                            },
                            body: 'Couldn\'t insert playlist record in database.',
                        });
                    } else {
                        const response = {
                            statusCode: 200,
                            body: event.key,
                        };
                        callback(null, response);
                    }
                })
            }
        });
    }
};