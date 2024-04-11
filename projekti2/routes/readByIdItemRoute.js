const { MongoClient } = require('mongodb');
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const mongoose = require("mongoose");
require('dotenv').config();



async function main() {
    const uri = process.env.MONGODB_URI;

    const client = new MongoClient(uri);

    try {
        console.log("Trying to connect")
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);
    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
        console.log("Dismissing connection")
    }
}

main().catch(err => console.log(err));

/**
 * Print the names of all available databases
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

