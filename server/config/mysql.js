const Sequelize = require('sequelize')

const dbname = process.env.DBNAME
const dbuser = process.env.DBUSER
const dbpass = process.env.DBPASS
const dbhost = process.env.DBHOST

// Connect to mysql database
module.exports = new Sequelize(dbname, dbuser, dbpass, {
  host: dbhost,
  dialect: 'mysql'
})
