### Serverless Implementation of Spotify Add song and Playlist feature.

#### Introduction
This repository contains following microservices:

1. A services that adds all of your audio files in an S3 bucket to a DynamoDB

2. A service that allows a user to search for a song(the name of the file) or
returns a list of all of the songs(files) you have in your S3 bucket.

3. A service that allows you to create a new playlist and add a song to that
playlist.

For the purposes of simplicity, I will be making several small txt files
to stand in for MP3s/OGG(other audio files)

#### Usage
- Install Serverless framework and setup AWS credentials.

- Clone this repository and deploy it on AWS using 
    ```sh
    sudo serverless deploy
    ```
- All the following are the different lambda functions which can be invoked by typing particular command on terminal.
    - A services that adds all of your audio files in an S3 bucket to a DynamoDB database.
    ```sh

    sudo serverless invoke --function insertfile --log --data=' { "fileurl" : "http://www.ohchr.org/EN/UDHR/Documents/UDHR_Translations/eng.pdf", "key" : "document12.pdf" } '

    ##This function takes a url from internet and post that file into S3 bucket and dynamoDb.
    
    ```
    - A service that allows a user to search for a song(the name of the file) or returns a list of all of the songs(files) you have in your S3 bucket
    ```sh
    ##List all the files inside the bucket.

    sudo serverless invoke --function getfile –log

    ##Get the specific file inside the bucket.

    sudo serverless invoke --function getfile --log --data=' { "key" : "document10.pdf" } '

    ```
    - Create a playlist and insert into dynamodb
    ```sh

    sudo serverless invoke --function createplaylist --log --data=' { "playlist": 	"myplaylist" , "key" : "document10.pdf" } '

    #Function checks file inside the common bucket, if it is present their, it insert file name(primary_key) in new table with playlist name.
    ```