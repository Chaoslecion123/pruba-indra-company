"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const middy = require("middy");
const util = require('../util');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.FILMS_TABLE;

const listFilms = async (event) => {
  const params = {
    TableName: tableName,
  };

  try {
    const results = await dynamoDB.scan(params).promise();
    console.log("*** ** ***");
    console.log(results.Items);
    console.log("*** ** ***");
    return {
      headers: util.getResponseHeaders(),
      statusCode: 200,
      body: JSON.stringify(results.Items),
    };
  } catch (error) {
    return {
      headers: util.getResponseHeaders(),
      statusCode: error.statusCode ? error.statusCode : 500,
      body: JSON.stringify({
        error: error.name ? error.name : "Exception",
        message: error.message ? error.message : "Unknown error",
      }),
    };
  }
};

const handler = middy(listFilms)

module.exports = { handler };
