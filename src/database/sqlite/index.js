const sqlite3 = require("sqlite3");
//drive que estabelece a comunicação
const sqlite = require("sqlite");
//responsavel por conectar

const path = require("path");
//resolve problemas de enedereço de acordo com o ambiente

async function sqliteConnection(){
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"),
        driver: sqlite3.Database
    });


    return database;

}


module.exports = sqliteConnection;