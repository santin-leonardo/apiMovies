const path = require("path");


module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname,"src","database","database.db")
    },

    pool: {
      afterCreate: (conn,cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },//isso habilita o cascade ou seja quando uma nota for deletada as tags tambem serão

    migrations:{
      directory:path.resolve(__dirname,"src","database","knex","migrations")
    },

    useNullAsDefault: true
  },
};
