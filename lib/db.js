'use strict'

const MongoClient = require('mongodb').MongoClient

const {
    DB_USER,
    DB_PASSWD,
    DB_NAME
} = process.env

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWD}@cluster0-df9cm.mongodb.net/test?retryWhites=true&w=majority`


let connection

async function connectDB() {
    if (connection) return connection
    let client
    
    try {
        client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        connection = client.db(DB_NAME)
    } catch (error) {
        console.log('No se pudo conectar a la base de datos de mongo', uri, error)
        process.exit(1)        
    }
    return connection
}

module.exports = connectDB