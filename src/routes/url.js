const express = require('express');
const shortid = require('shortid');
const validUrl = require('valid-url')
const AWS = require('aws-sdk')
require('dotenv').config();

const router = express.Router();

const awsConfig = {
    "region":"us-east-1",
    "endpoint":"http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId":process.env.ACCESS_KEY,
    "secretAccessKey":process.env.SECRET_KEY
}
AWS.config.update(awsConfig)

const dbClient = new AWS.DynamoDB.DocumentClient()

router.post("/",(req,res) => {
    const {longUrl} = req.body

    if(validUrl.isUri(longUrl)){
        const queryParams = {
            TableName:'urls',
            Key : {
                "long_url":longUrl
            }
        }
        dbClient.get(queryParams,(err,data) => {
            if(err){
                res.status(500).json("Unable to process request at the moment")
            }
            else if(Object.keys(data).length > 0){
                res.json(data.Item)
            } 
            else {
                const baseUrl = "myweb.co"
                const urlCode = shortid.generate()
                const shortUrl = baseUrl + "/" + urlCode
                const inputData = {
                    "long_url":longUrl,
                    "short_url":shortUrl,
                    "url_code":urlCode
                }
                const inputParams = {
                    TableName:"urls",
                    Item:inputData
                }
                dbClient.put(inputParams,(err,data) => {
                    if(err){
                        res.status(500).json("Unable to process request at the moment")
                    } else {
                        res.json(inputData)
                    }
                })
            }
        })
    } else {
        res.status(401).json("Invalid Url")
    }
})

module.exports = router;