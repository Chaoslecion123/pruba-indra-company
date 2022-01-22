"use strict";
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const { jsonBodyParser } = require("middy/middlewares");
const util = require('../util');
const middy = require("middy");
const axios = require("axios");




const getFilm = async (event) => {
  try {
    const parameters = event.queryStringParameters;
    let data = await axios.get(
      `https://swapi.py4e.com/api/films/${parameters.id}`
    );
    return {
      headers: util.getResponseHeaders(),
      statusCode: 200,
      body: JSON.stringify(data.data),
    };
  } catch (error) {
    return {
      statusCode: error.statusCode ? error.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: error.name ? error.name : "Exepcion",
        message: error.message ? error.message : "Error Desconocido",
      }),
    };
  }
};

const handler = middy(getFilm).use(jsonBodyParser());

module.exports = { handler };
