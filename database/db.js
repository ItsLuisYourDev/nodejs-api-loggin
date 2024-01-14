const Datastore = require('nedb')
const db = new Datastore({ filename: './database/users.db', autoload: true });
module.exports = db
