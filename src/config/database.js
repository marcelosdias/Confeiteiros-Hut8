require('dotenv').config()

module.exports = {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: 'feed_my_party',
    define: {
        timestamps: true,
        underscored: true
    }
}