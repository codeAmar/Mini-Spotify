### DropBox file insert and delete implementation

This repository uses serverless to deploy a lambda, dynamodb table and an s3 bucket.


Using S3, DynamoDB and Serverless it creates some of the functionality for the backend of a miniature DropBox, file storage type 
of application. It keep track of the contents of an S3 bucket in a DynamoDB table. If a new file is added to bucket a record of that is added to database. If a file is deleted a record of the files deletion is added to database.

Moreover, it notifies send SMS to user if an file is added to his bucket.

#### Steps to Run Code:
- Install serverless framework and set up credentials for aws.
- Go ahead and buy a number from twilio.
- Clone this repository.
- Do, `npm i` to install the dependencies.
- Create a file named `env.yml` and type the following inside it.
    ```sh
    dev:
        SID: twilio sid
        TOKEN: twilio token
        TONUMBER: twilio number
        FROMNUMBER: personal cell number
  ```
- Once finished with setup, run `serverless deploy`, to deploy your project. This will run cloud formation stack.


#### Usage
- Command to insert a file into s3 and sms notification
  
```
sudo serverless invoke --function insertfile --log --data=' { "fileurl" : "http://www.ohchr.org/EN/UDHR/Documents/UDHR_Translations/eng.pdf", "key" : "document8.pdf" } '
  
```
- Command to delete file from s3

```
sudo serverless invoke --function deletefile --log --data=' { "key" : "document8.pdf" } '
```